package com.dwaragesh.insights.dto.Edge;

import com.dwaragesh.insights.model.Component;

public record EdgeResponse(

    int edgeId,
    String edgeName,
    String color,
    Component source,
    Component target
) {
}
