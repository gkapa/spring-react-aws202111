package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.MUser;
import com.carma.hanppopen.infra.entity.MUserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MUserStatusRepo extends JpaRepository<MUserStatus, Integer> {
    public MUserStatus findByContent(String content);
}
