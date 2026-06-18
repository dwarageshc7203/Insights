package com.dwaragesh.insights.dto.AI;

/**
 * DTO representing an edge in the semantic graph sent from the frontend.
 * All identifiers are strings to match ReactFlow payload.
 */
public record AiEdge(
        String id,
        String source,
        String target,
        String label
) {}
