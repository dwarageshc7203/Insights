package com.dwaragesh.insights.dto.AI;

/**
 * DTO representing a node in the semantic graph sent from the frontend.
 * All identifiers are strings because ReactFlow uses string IDs.
 */
public record AiNode(
        String id,
        String type,
        String textContent,
        String shapeType
) {}
