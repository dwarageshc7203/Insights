package com.dwaragesh.insights.dto.Edge;

import com.dwaragesh.insights.model.Node;

import java.util.List;

public record EdgeRequest(

    List<Node> sources,
    List<Node> destinations

) {
}
