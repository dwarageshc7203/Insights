package com.dwaragesh.insights.dto.Component;

public record ComponentRequest(

    String componentName,
    String type,
    String shapeType,
    String textContent,
    String imgUrl,
    String color,
    double positionX,
    double positionY
) {
}
