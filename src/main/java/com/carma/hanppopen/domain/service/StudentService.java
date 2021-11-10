package com.carma.hanppopen.domain.service;

import com.carma.hanppopen.infra.entity.CourseEntity;
import com.carma.hanppopen.infra.entity.StudentCourseEntity;
import com.carma.hanppopen.infra.entity.StudentEntity;
import com.carma.hanppopen.infra.repository.CourseRepository;
import com.carma.hanppopen.infra.repository.StudentCourseRepository;
import com.carma.hanppopen.infra.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final StudentCourseRepository studentCourseRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository, StudentCourseRepository studentCourseRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.studentCourseRepository = studentCourseRepository;
    }

    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }

    public void saveStudent(StudentEntity sdata) {
        studentRepository.save(sdata);
    }

    public List<StudentCourseEntity> findStudentCourseByStudentId(UUID studentId) {
        return studentCourseRepository.findByStudentId(studentId);
    }
}
