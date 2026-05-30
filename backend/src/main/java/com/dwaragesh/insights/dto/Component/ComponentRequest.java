package com.dwaragesh.insights.dto.Component;

public record ComponentRequest(

    String componentName,
    String componentType,
    String textContent,
    String imgUrl,
    String color,
    double positionX,
    double positionY
) {
}
