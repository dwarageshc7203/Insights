package com.dwaragesh.insights.dto.User;

import com.dwaragesh.insights.model.WorkSpace;

import java.time.Instant;

public record UserResponse(

        int uid,
        String uname,
        String email,
        WorkSpace workSpace,
        Instant createdAt

) {
}
