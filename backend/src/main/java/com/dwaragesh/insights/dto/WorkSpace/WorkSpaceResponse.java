package com.dwaragesh.insights.dto.WorkSpace;

import com.dwaragesh.insights.model.User;

import java.time.Instant;
import java.util.UUID;

public record WorkSpaceResponse(

        int workSpaceId,
        String workSpaceName,
        UUID userId,
        Instant createdAt

) {
}
