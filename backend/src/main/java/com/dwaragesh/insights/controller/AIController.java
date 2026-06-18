package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.AI.AnalyzeRequest;
import com.dwaragesh.insights.dto.AI.AnalyzeResponse;
import com.dwaragesh.insights.service.AIService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalyzeResponse> analyze(
            @RequestBody AnalyzeRequest request
    ) {
        AnalyzeResponse response = aiService.analyzeCanvas(request);
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }
}