package com.carma.hanppopen.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/token")
@CrossOrigin
public class TokenController {
    @GetMapping("/refresh")
    public ResponseEntity<String> testtest1() throws Exception {
        return ResponseEntity.ok().body("ok");
    }
}
