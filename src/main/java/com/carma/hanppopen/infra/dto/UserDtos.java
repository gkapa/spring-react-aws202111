package com.carma.hanppopen.infra.dto;

import lombok.Data;

public class UserDtos {
    @Data
    public static class signInReqDto {
        private String email;
        private String password;
    }

    @Data
    public static class signUpReqDto {
        private String username;
        private String password;
        private String email;
    }
}
