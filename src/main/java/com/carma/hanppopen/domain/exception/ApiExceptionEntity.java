package com.carma.hanppopen.domain.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
public class ApiExceptionEntity {
    private String message;
    private String errorCode;
    private HttpStatus httpStatus;

    @Builder
    public ApiExceptionEntity(String message, String errorCode, HttpStatus httpStatus) {
        this.message = message;
        this.errorCode = errorCode;
    }
}