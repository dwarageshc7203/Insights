package com.dwaragesh.insights.dto.Canvas;

import com.dwaragesh.insights.model.Component;
import com.dwaragesh.insights.model.Edge;

import java.util.List;

public record CanvasDetailsResponse(

        int canvasId,
        String canvasName,
        int workSpaceId,
        List<Component> components,
        List<Edge> edges
        
) {
}
