package com.dwaragesh.insights.dto.Canvas;

import com.dwaragesh.insights.dto.Component.ComponentResponse;
import com.dwaragesh.insights.dto.Edge.EdgeResponse;

import java.util.List;

public record CanvasDetailsResponse(

        int canvasId,
        String canvasName,
        int workSpaceId,
        List<ComponentResponse> components,
        List<EdgeResponse> edges

) {
}
