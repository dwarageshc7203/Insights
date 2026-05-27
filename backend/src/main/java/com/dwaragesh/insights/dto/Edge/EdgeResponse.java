package com.dwaragesh.insights.dto.Edge;

import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.Node;

import java.time.Instant;
import java.util.List;

public record EdgeResponse(

    int eid,
    int uid,
    List<Node> sources,
    List<Node> destinations,
    Instant createdAt,
    Canvas canvas

) {
}
