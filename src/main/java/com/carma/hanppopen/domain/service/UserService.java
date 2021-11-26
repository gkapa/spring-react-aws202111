package com.carma.hanppopen.domain.service;

import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import com.carma.hanppopen.domain.exception.ApiRequestException;
import com.carma.hanppopen.infra.dto.JwtDtos;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.repository.MUserRepo;
import com.carma.hanppopen.infra.repository.MUserStatusRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
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

    public void signOut(HttpServletResponse response) {
        jwtTokenProvider.expireAccessAndRefreshToken(response);
    }

    public void signIn(HttpServletResponse response, UserDtos.signInReqDto data) {
        MUser mUser = mUserRepo.findByEmail(data.getEmail())
                .orElseThrow(() -> new ApiRequestException("存在しないメールアドレスです。"));
        if (!passwordEncoder.matches(data.getPassword(), mUser.getPassword())) {
            throw new ApiRequestException("パスワードが一致しません。入力したパスワードをご確認ください。");
        }
        String[] jwtTokens = createJwtTokens(mUser);
        jwtTokenProvider.setCookieToClient(response, jwtTokens[0], jwtTokens[1]);
//        JwtDtos.JwtDto dto = JwtDtos.JwtDto.builder()
//                .userId(mUser.getUserId())
//                .accessToken(jwtTokens[0])
//                .refreshToken(jwtTokens[1])
//                .build();

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

    private String[] createJwtTokens(MUser mUser) {
        String accessToken = jwtTokenProvider.createAccessToken(mUser);
        String refreshToken = jwtTokenProvider.createAndSaveRefreshToken(mUser);
        return new String[]{accessToken, refreshToken};
    }
}
