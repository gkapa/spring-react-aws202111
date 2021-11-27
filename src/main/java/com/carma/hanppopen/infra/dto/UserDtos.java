package com.carma.hanppopen.infra.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

public class UserDtos {
    @Data
    public static class SignInReqDto {
        private String email;
        private String password;
    }

    @Data
    public static class SignUpReqDto {
        @Size(min = 2, message = "ユーザ名は、2文字以上に入力してください")
        private String username;

        @Size(min = 6, message = "パスワードは、6文字以上に入力してください")
        private String password;

        @Email(message = "正しいメールアドレスを入力してください")
        private String email;
    }

    @Data
    public class UserInfoDto {
        private Long userId;

        private String name;

        private String email;

        private Integer loginFailCnt;
    }
}
