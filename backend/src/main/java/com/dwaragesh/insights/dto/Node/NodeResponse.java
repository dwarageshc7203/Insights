package com.dwaragesh.insights.dto.Node;

import com.dwaragesh.insights.model.Canvas;

import java.time.Instant;

public record NodeResponse(

    int nid,
    int uid,
    String contents,
    int[] position,
    Instant createedAt,
    Canvas canvas

) {
}
