package com.dwaragesh.insights.dto.Canvas;

import java.time.Instant;

public record CanvasResponse(

        int cid,
        String cName,
        int uid,
        Instant createdAt

) {
}
