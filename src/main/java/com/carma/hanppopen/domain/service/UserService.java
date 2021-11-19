package com.carma.hanppopen.domain.service;

import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import com.carma.hanppopen.domain.exception.ApiRequestException;
import com.carma.hanppopen.infra.dto.JwtDto;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.repository.MUserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserService {

    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private MUserRepo mUserRepo;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, MUserRepo mUserRepo) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.mUserRepo = mUserRepo;
    }

    public void signUp(UserDtos.signUpReqDto data) {
        Optional<MUser> mUser = mUserRepo.findByEmail(data.getEmail());
        mUser.ifPresent(x -> new ApiRequestException("email already exist: " + data.getEmail()));
        MUser newUser = MUser.builder()
                .username(data.getUsername())
                .password(passwordEncoder.encode(data.getPassword()))
                .email(data.getEmail()).build();
        mUserRepo.save(newUser);
    }

    public JwtDto signIn(UserDtos.signInReqDto data) {
        MUser mUser = mUserRepo.findByEmail(data.getEmail())
                .orElseThrow(() -> new ApiRequestException("no user data: " + data.getEmail()));
        if (!passwordEncoder.matches(data.getPassword(), mUser.getPassword())) {
            throw new ApiRequestException("password not equals: " + data.getEmail());
        }
        String[] jwtTokens = createJwtTokens(mUser, new ArrayList<>(Arrays.asList("ROLE_USER")));
        return JwtDto.builder()
                .userId(mUser.getUserId())
                .accessToken(jwtTokens[0])
                .refreshToken(jwtTokens[1])
                .build();
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
