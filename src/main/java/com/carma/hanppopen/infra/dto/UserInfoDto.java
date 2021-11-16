package com.carma.hanppopen.infra.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class UserInfoDto {
    private Long userId;

    private String name;

    private String email;

    private Integer loginFailCnt;
}
