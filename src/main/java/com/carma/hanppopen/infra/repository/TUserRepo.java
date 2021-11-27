package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.TUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TUserRepo extends JpaRepository<TUser, Long> {

    public TUser findByUserId(Long userId);

    public TUser findByUsername(String name);

    public Optional<TUser> findByEmail(String email);
}
