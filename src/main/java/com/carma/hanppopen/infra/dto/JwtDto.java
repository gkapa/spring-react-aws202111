package com.carma.hanppopen.infra.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtDto {
    private Long userId;
    private String accessToken;
    private String refreshToken;
}
