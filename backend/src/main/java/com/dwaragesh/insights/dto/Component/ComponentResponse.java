package com.dwaragesh.insights.dto.Component;

import com.dwaragesh.insights.model.Canvas;

import java.time.Instant;

public record ComponentResponse(

    int nid,
    int uid,
    String contents,
    int[] position,
    Instant createedAt,
    Canvas canvas

) {
}
