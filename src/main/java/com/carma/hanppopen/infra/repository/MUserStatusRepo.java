package com.carma.hanppopen.infra.repository;

import com.carma.hanppopen.infra.entity.MUserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MUserStatusRepo extends JpaRepository<MUserStatus, Integer> {
    public MUserStatus findByStatusTx(String tx);
}
