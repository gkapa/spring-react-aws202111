package com.carma.hanppopen.infra.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter @Setter @ToString
@Builder @NoArgsConstructor @AllArgsConstructor
@Table(name = "ma_user_status")
public class MUserStatus {
    @Id
    private Integer statusId;

    @Column
    private String statusTx;
}
