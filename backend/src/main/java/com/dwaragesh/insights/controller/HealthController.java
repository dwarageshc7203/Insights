package com.dwaragesh.insights.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Lightweight health check endpoint for Render's HTTP health check probe
 * and any uptime-monitoring tools.
 *
 * GET /health  →  {"status": "UP"}
 *
 * This endpoint is explicitly whitelisted in SecurityConfig as public (no JWT required).
 */
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }
}
