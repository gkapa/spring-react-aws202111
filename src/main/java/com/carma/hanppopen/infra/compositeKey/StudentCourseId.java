package com.carma.hanppopen.infra.compositeKey;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@EqualsAndHashCode
@NoArgsConstructor
public class StudentCourseId implements Serializable {
    @Id
    private UUID studentId;

    @Id
    private UUID courseId;

    @Id
    private int takeCount;
}
