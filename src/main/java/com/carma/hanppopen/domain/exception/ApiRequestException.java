package com.carma.hanppopen.domain.exception;

import lombok.Getter;

@Getter
public class ApiRequestException extends RuntimeException {
    private ExceptionEnum error;

    public ApiRequestException(String message) {
        super(message);
    }

    public ApiRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    // 아래와 같이 사용할 수 있다.
    // throw new ApiRequestException(ExceptionEnum.SECURITY_01);
    public ApiRequestException(ExceptionEnum e) {
        super(e.getMessage());
        this.error = e;
    }
}
