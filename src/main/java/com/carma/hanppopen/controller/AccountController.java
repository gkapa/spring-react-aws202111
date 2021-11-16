package com.carma.hanppopen.controller;

import com.carma.hanppopen.domain.service.StudentService;
import com.carma.hanppopen.infra.dto.AddNewStudentDto;
import com.carma.hanppopen.infra.entity.StudentCourseEntity;
import com.carma.hanppopen.infra.entity.StudentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final StudentService studentService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public AccountController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/getAll")
    public List<StudentEntity> getAllStudents() throws Exception {
//        throw new ApiRequestException(ExceptionEnum.INTERNAL_SERVER_ERROR);
        return studentService.getAllStudents();
    }

    @GetMapping("/{accountId}")
    public List<StudentCourseEntity> getAccountInfoByAccountId(@PathVariable("accountId") long accountId) {
//        return studentService.findStudentCourseByStudentId(studentId);
        return null;
    }

    @PostMapping("/addNew")
    public ResponseEntity<String> addNewStudent(@RequestBody @Valid AddNewStudentDto cdata) throws Exception {
        System.out.println(cdata.toString());
        StudentEntity sdata = modelMapper.map(cdata, StudentEntity.class);
        studentService.saveStudent(sdata);
        return ResponseEntity.ok().body("dto 객체 검증 성공");
    }
}
