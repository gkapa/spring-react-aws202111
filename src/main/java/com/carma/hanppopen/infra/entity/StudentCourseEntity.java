package com.carma.hanppopen.infra.entity;

import com.carma.hanppopen.infra.compositeKey.StudentCourseId;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Table(name = "student_course")
@IdClass(StudentCourseId.class)
public class StudentCourseEntity {
    @Id
    private UUID studentId;

    @Id
    private UUID courseId;

    @Id
    private int takeCount;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String grade;
}
