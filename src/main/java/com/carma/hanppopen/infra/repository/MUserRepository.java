package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.MUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MUserRepository extends JpaRepository<MUserEntity, Long> {

    public MUserEntity findByUserId(Long userId);

    public Optional<MUserEntity> findByUsername(String name);

    public MUserEntity findByEmail(String email);
}
