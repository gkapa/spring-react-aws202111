package com.carma.hanppopen.infra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class JwtDtos {
    @Data
    @Builder
    public static class JwtDto {
        private Long userId;
        private String accessToken;
        private String refreshToken;
    }

    @Data
    @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SignInResBodyDto {
        private Long userId;
        private String accessToken;
    }

    @Data
    public static class TokenRefreshRequestDto {
        private String refreshToken;
    }
}
