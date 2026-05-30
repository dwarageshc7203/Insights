package com.dwaragesh.insights.dto.User;

import com.dwaragesh.insights.model.WorkSpace;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(

        UUID userId,
        String userName,
        String email,
        Instant createdAt

) {
}
