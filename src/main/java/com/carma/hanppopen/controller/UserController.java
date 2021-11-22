package com.carma.hanppopen.controller;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.domain.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@Valid @RequestBody UserDtos.signInReqDto data) throws Exception {
        String lg = "[Request] sign-in " + data.getEmail();
        log.info(lg);
        return ResponseEntity.ok().body(userService.signIn(data));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signIn(@Valid @RequestBody UserDtos.signUpReqDto data) throws Exception {
        String lg = "[Request] sign-up " + data.getEmail();
        log.info(lg);
        userService.signUp(data);
        return ResponseEntity.ok().body("Added User");
    }

    @GetMapping("/user/regist")
    public ResponseEntity<?> completeSignUp(
            @RequestParam("key") String registKey,
            @RequestParam("email") String email) throws Exception {
        log.info("Request of signUp completion:: key: " + registKey + ", email: " + email);
        userService.updateUserStatusToAuthenticated(registKey, email);
        return ResponseEntity.ok().body("User Authenticated Sign");
    }
}
