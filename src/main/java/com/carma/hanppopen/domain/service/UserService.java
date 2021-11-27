package com.carma.hanppopen.domain.service;

import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import com.carma.hanppopen.domain.exception.ApiRequestException;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.infra.entity.TUser;
import com.carma.hanppopen.infra.repository.TUserRepo;
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

    private TUserRepo tUserRepo;
    private MUserStatusRepo mUserStatusRepo;
    private MailService mailService;

    @Autowired
    public UserService(TUserRepo tUserRepo, MUserStatusRepo mUserStatusRepo, MailService mailService) {
        this.tUserRepo = tUserRepo;
        this.mUserStatusRepo = mUserStatusRepo;
        this.mailService = mailService;
    }

    public void signUp(UserDtos.SignUpReqDto data) {
        Optional<TUser> mUser = tUserRepo.findByEmail(data.getEmail());
        mUser.ifPresent(x -> new ApiRequestException("email already exist: " + data.getEmail()));
        String registKey = UUID.randomUUID().toString();
        TUser newUser = TUser.builder()
                .username(data.getUsername())
                .password(passwordEncoder.encode(data.getPassword()))
                .email(data.getEmail())
                .refreshToken(registKey)
                .build();
        tUserRepo.save(newUser);
        mailService.sendSignUpEmail("[HAN] ポートフォリオサイト登録認証用メール", data.getEmail(), newUser.getEmail(), registKey);
    }

    public void signOut(HttpServletResponse response) {
        jwtTokenProvider.expireAccessAndRefreshToken(response);
    }

    public void signIn(HttpServletResponse response, UserDtos.SignInReqDto data) {
        TUser tUser = tUserRepo.findByEmail(data.getEmail())
                .orElseThrow(() -> new ApiRequestException("存在しないメールアドレスです。"));
        if (!passwordEncoder.matches(data.getPassword(), tUser.getPassword())) {
            throw new ApiRequestException("パスワードが一致しません。入力したパスワードをご確認ください。");
        }
        String[] jwtTokens = createJwtTokens(tUser);
        jwtTokenProvider.setCookieToClient(response, jwtTokens[0], jwtTokens[1]);
//        JwtDtos.JwtDto dto = JwtDtos.JwtDto.builder()
//                .userId(mUser.getUserId())
//                .accessToken(jwtTokens[0])
//                .refreshToken(jwtTokens[1])
//                .build();

    }

    public void updateUserStatusToAuthenticated(String registKey, String email) {
        TUser tUser = tUserRepo.findByEmail(email)
                .orElseThrow(() -> new ApiRequestException("no user data: " + email));
        if (!registKey.equals(tUser.getRefreshToken())) {
            throw new ApiRequestException("registKey not equals, user: " + email);
        }
        if (!tUser.getStatus().equals(mUserStatusRepo.findByStatusTx("WAIT_EMAIL_AUTHENTICATION").getStatusId())) {
            throw new ApiRequestException("User status is not UNAUTHENTICATED: " + email);
        }
        TUser newUser = modelMapper.map(tUser, TUser.class);
        newUser.setStatus(mUserStatusRepo.findByStatusTx("AUTHENTICATED").getStatusId());

        tUserRepo.save(newUser);
    }

    private String[] createJwtTokens(TUser tUser) {
        String accessToken = jwtTokenProvider.createAccessToken(tUser);
        String refreshToken = jwtTokenProvider.createAndSaveRefreshToken(tUser);
        return new String[]{accessToken, refreshToken};
    }
}
