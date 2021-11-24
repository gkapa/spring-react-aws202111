package com.carma.hanppopen.controller;

import com.carma.hanppopen.domain.service.StudentService;
import com.carma.hanppopen.infra.dto.AddNewStudentDto;
import com.carma.hanppopen.infra.entity.StudentCourseEntity;
import com.carma.hanppopen.infra.entity.StudentEntity;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

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
