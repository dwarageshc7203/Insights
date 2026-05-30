package com.dwaragesh.insights.dto.Edge;

import com.dwaragesh.insights.model.Component;

public record EdgeRequest(

        String edgeName,
        String color,
        Component source,
        Component target

) {
}
