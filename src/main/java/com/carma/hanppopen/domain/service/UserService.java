package com.carma.hanppopen.domain.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import com.carma.hanppopen.domain.exception.ApiRequestException;
import com.carma.hanppopen.infra.dto.JwtDto;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.repository.MUserRepo;
import com.carma.hanppopen.infra.repository.MUserStatusRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private MUserRepo mUserRepo;
    private MUserStatusRepo mUserStatusRepo;
    private MailService mailService;

    @Autowired
    public UserService(MUserRepo mUserRepo, MUserStatusRepo mUserStatusRepo, MailService mailService) {
        this.mUserRepo = mUserRepo;
        this.mUserStatusRepo = mUserStatusRepo;
        this.mailService = mailService;
    }

    public void signUp(UserDtos.signUpReqDto data) {
        Optional<MUser> mUser = mUserRepo.findByEmail(data.getEmail());
        mUser.ifPresent(x -> new ApiRequestException("email already exist: " + data.getEmail()));
        String registKey = UUID.randomUUID().toString();
        MUser newUser = MUser.builder()
                .username(data.getUsername())
                .password(passwordEncoder.encode(data.getPassword()))
                .email(data.getEmail())
                .refreshToken(registKey)
                .build();
        mUserRepo.save(newUser);
        mailService.sendSignUpEmail("[HAN] ポートフォリオサイト登録認証用メール", data.getEmail(), newUser.getEmail(), registKey);
    }

    public JwtDto signIn(UserDtos.signInReqDto data) {
        MUser mUser = mUserRepo.findByEmail(data.getEmail())
                .orElseThrow(() -> new ApiRequestException("存在しないメールアドレスです。"));
        if (!passwordEncoder.matches(data.getPassword(), mUser.getPassword())) {
            throw new ApiRequestException("パスワードが一致しません。入力したパスワードをご確認ください。");
        }
        String[] jwtTokens = createJwtTokens(mUser, new ArrayList<>(Arrays.asList("ROLE_USER")));
        return JwtDto.builder()
                .userId(mUser.getUserId())
                .accessToken(jwtTokens[0])
                .refreshToken(jwtTokens[1])
                .build();
    }

    public void updateUserStatusToAuthenticated(String registKey, String email) {
        MUser mUser = mUserRepo.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("no user data: " + email));
        if (!registKey.equals(mUser.getRefreshToken())) {
            throw new ApiRequestException("registKey not equals, user: " + email);
        }
        if (!mUser.getStatus().equals(mUserStatusRepo.findByContent("WAIT_EMAIL_AUTHENTICATION").getStatusId())) {
            throw new ApiRequestException("User status is not UNAUTHENTICATED: " + email);
        }
        MUser newUser = modelMapper.map(mUser, MUser.class);
        newUser.setStatus(mUserStatusRepo.findByContent("AUTHENTICATED").getStatusId());

        mUserRepo.save(newUser);
    }

    private String[] createJwtTokens(MUser user, List<String> roles) {
        String accessToken = jwtTokenProvider.createAccessToken(user.getUsername(), roles);
        String refreshTokenValue = UUID.randomUUID().toString().replace("-", "");
        String refreshToken = jwtTokenProvider.createRefreshToken(refreshTokenValue);
        saveRefreshTokenValue(user, refreshTokenValue);
        return new String[]{accessToken, refreshToken};
    }

    private void saveRefreshTokenValue(MUser user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        mUserRepo.save(user);
    }
}
