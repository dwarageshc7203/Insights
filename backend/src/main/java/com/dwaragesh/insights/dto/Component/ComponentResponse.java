package com.dwaragesh.insights.dto.Component;

import com.dwaragesh.insights.model.Canvas;

import java.time.Instant;

public record ComponentResponse(

    int componentId,
    String componentName,
    String componentType,
    String textContent,
    String imgUrl,
    String color,
    double positionX,
    double positionY

) {
}
