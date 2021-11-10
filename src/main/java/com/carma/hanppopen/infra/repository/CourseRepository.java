package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.compositeKey.StudentCourseId;
import com.carma.hanppopen.infra.entity.CourseEntity;
import com.carma.hanppopen.infra.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, UUID> {

}
