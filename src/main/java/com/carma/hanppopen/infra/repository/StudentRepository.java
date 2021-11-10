package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {



//    public List<Student> selectAllStudents() {
//        return List.of(
//                new Student(UUID.randomUUID(), "James", "Bond", "jamesbond@gmail.com", Student.Gender.MALE),
//                new Student(UUID.randomUUID(), "Elisa", "Tamara", "elisatamara@gmail.com", Student.Gender.FEMALE)
//        );
//    }
}
