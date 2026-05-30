package com.dwaragesh.insights.dto.Canvas;

import java.time.Instant;

public record CanvasResponse(

        int canvasId,
        String canvasName,
        int workSpaceId

) {
}
