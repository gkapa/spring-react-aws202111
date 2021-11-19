package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.MUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MUserRepo extends JpaRepository<MUser, Long> {

    public MUser findByUserId(Long userId);

    public MUser findByUsername(String name);

    public Optional<MUser> findByEmail(String email);
}
