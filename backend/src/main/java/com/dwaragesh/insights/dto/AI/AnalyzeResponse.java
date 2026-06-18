package com.dwaragesh.insights.dto.AI;

/**
 * Simple response from the AI analysis service.
 * "summary" holds the human‑readable analysis text.
 * "details" can be used for structured data in the future.
 */
public record AnalyzeResponse(
    String summary,
    java.util.Map<String, Object> details
) {}
