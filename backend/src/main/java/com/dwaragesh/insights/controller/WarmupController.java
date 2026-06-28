package com.dwaragesh.insights.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarmupController {
    /**
     * Simple endpoint that Render can ping to keep the container warm.
     * Returns HTTP 200 with a short text.
     */
    @GetMapping("/warmup")
    public String warmup() {
        return "OK";
    }
}
