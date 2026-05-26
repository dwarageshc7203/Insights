package com.dwaragesh.insights.dto.User;

import java.time.Instant;

public record UserResponse(

        int uid,
        String uname,
        String email,
        String password,
        Instant createdAt

) {
}
