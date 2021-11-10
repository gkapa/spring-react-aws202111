package com.carma.hanppopen.domain.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ApiExceptionHandler {
    // 전역 예외처리

    // ApiRequestException 클래스와 연동해서, 아래와 같이 사용할 수 있다.
    // throw new ApiRequestException(ExceptionEnum.SECURITY_01);
    @ExceptionHandler({ApiRequestException.class})
    public ResponseEntity<Object> exceptionHandler(ApiRequestException ex) {
        ex.printStackTrace();

        return ResponseEntity
                .status(ex.getError().getStatus())
                .body(ApiExceptionEntity.builder()
                        .errorCode(ex.getError().getCode())
                        .message(ex.getError().getMessage())
                        .build());
    }

    // @Jpa DB 에러 발생시
    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String response = ex.getMostSpecificCause().getMessage();
        return ResponseEntity.badRequest().body(response);

//        /* --------------------------------------------- */
//        System.out.println(ex.getMostSpecificCause()); // =>
//        org.postgresql.util.PSQLException: ERROR: duplicate key value violates unique constraint "student_email_key"
//        Detail: Key (email)=(zx@cc.com) already exists.
//        String response = ex.getMostSpecificCause().getMessage();
//        ERROR: duplicate key value violates unique constraint "student_email_key"
//        Detail: Key (email)=(zx@cc.com) already exists.
//        /* --------------------------------------------- */
//        System.out.println(ex.getMessage()); // =>
//        could not execute statement; SQL [n/a]; constraint [student_email_key]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement
//        /* --------------------------------------------- */
    }

    // @Valid 에러 발생시
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors()
                .forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

//    @ExceptionHandler({ApiRequestException.class})
//    public ResponseEntity<Object> handleApiRequestException(ApiRequestException ex) {
//        // lesson51 참조
//        // 1. Create payload containing exception details
//        ApiExceptionEntity apiException = new ApiExceptionEntity(
//                ex.getMessage(),
//                "xxx",
//                HttpStatus.BAD_REQUEST,
//                ZonedDateTime.now(ZoneId.of("Z"))
//        );
//
//        // 2. Return response entity
//        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
//    }
}
