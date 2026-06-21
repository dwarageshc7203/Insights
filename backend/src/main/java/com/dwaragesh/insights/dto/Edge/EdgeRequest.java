package com.dwaragesh.insights.dto.Edge;

public record EdgeRequest(

        String edgeName,
        String color,
        int sourceId,
        int targetId,
        String sourceHandle,
        String targetHandle

) {
}
