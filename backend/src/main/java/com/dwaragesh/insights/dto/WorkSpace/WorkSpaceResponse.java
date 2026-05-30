package com.dwaragesh.insights.dto.WorkSpace;

import com.dwaragesh.insights.model.User;

import java.time.Instant;

public record WorkSpaceResponse(

        int workSpaceId,
        String workSpaceName,
        int userId,
        Instant createdAt

) {
}
