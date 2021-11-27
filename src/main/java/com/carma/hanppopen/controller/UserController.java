package com.carma.hanppopen.controller;

import com.carma.hanppopen.config.jwt.JwtTokenProvider;
import com.carma.hanppopen.infra.dto.JwtDtos;
import com.carma.hanppopen.infra.dto.UserDtos;
import com.carma.hanppopen.domain.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Value("${jwt.token-header}")
    private String JWT_HEADER;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@Valid @RequestBody UserDtos.SignInReqDto data, HttpServletResponse response) throws Exception {
        String lg = "[Request] sign-in " + data.getEmail();
        log.info(lg);

        userService.signIn(response, data);
        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> signOut(HttpServletResponse response) throws Exception {
        userService.signOut(response);
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signIn(@Valid @RequestBody UserDtos.SignUpReqDto data) throws Exception {
        String lg = "[Request] sign-up " + data.getEmail();
        log.info(lg);
        userService.signUp(data);
        return ResponseEntity.ok().body("Added User");
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<String> tokenRefresh() throws Exception {
        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/user/regist")
    public ResponseEntity<?> completeSignUp(
            @RequestParam("key") String registKey,
            @RequestParam("email") String email) throws Exception {
        log.info("Request of signUp completion:: key: " + registKey + ", email: " + email);
        userService.updateUserStatusToAuthenticated(registKey, email);
        return ResponseEntity.ok().body("User Authenticated Sign");
    }

    @GetMapping("/access-checker")
    public ResponseEntity<?> completeSignUp(@RequestHeader(name="Authorization") String header) {
        log.info(header);
        System.out.println(header);
        return ResponseEntity.ok().body("okok");
    }
}
