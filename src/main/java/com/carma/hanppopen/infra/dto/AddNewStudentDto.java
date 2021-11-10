package com.carma.hanppopen.infra.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AddNewStudentDto {
    @NotBlank
    @Size(min = 2, max = 6, message = "name length must be 2 <= x <= 6")
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String gender;
}
