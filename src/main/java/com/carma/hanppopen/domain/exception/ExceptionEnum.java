package com.carma.hanppopen.domain.exception;

// 참고사이트: https://leeys.tistory.com/30

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum ExceptionEnum {
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E0001"),
    ACCESS_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "E0002"),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "I0001", "internal server error"),

    SIGN_EMAIL_ALREADY_EXIST(HttpStatus.CONFLICT, "U001", "既に存在しているメールアドレスです。"),
    SIGN_EMAIL_NOT_EXIST(HttpStatus.CONFLICT, "U002", "存在しないメールアドレスです。"),

    SECURITY_01(HttpStatus.UNAUTHORIZED, "S0001", "권한이 없습니다."),

    ;




    private final HttpStatus status;
    private final String code;
    private String message;

    ExceptionEnum(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    ExceptionEnum(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
