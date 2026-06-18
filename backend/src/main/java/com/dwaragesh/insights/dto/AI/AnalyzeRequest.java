package com.dwaragesh.insights.dto.AI;

import java.util.List;

public record AnalyzeRequest(
    String canvasId,
    List<AiNode> nodes,
    List<AiEdge> edges
) {}
