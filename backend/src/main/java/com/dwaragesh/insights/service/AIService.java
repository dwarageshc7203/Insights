package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.AI.AnalyzeRequest;
import com.dwaragesh.insights.dto.AI.AnalyzeResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.Map;

@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    private static final HttpClient HTTP_CLIENT = HttpClient.newHttpClient();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String apiKey;

    public AnalyzeResponse analyzeCanvas(AnalyzeRequest request) {

        if (request == null ||
                request.nodes() == null ||
                request.nodes().isEmpty()) {

            return new AnalyzeResponse(
                    """
                    {
                      "summary": "",
                      "intent": "",
                      "entities": [],
                      "relationships": [],
                      "architecture": "",
                      "databaseDesign": "",
                      "flowchart": "",
                      "roadmap": "",
                      "implementationPrompt": "",
                      "missingInformation": []
                    }
                    """,
                    Collections.emptyMap()
            );
        }

        StringBuilder canvasData = new StringBuilder();

        canvasData.append("Canvas ID: ")
                .append(request.canvasId())
                .append("\n\n");

        canvasData.append("Nodes:\n");

        request.nodes().forEach(node ->
                canvasData.append(String.format(
                        "- id:%s, type:%s, shape:%s, text:%s%n",
                        node.id(),
                        node.type(),
                        node.shapeType(),
                        node.textContent()
                ))
        );

        canvasData.append("\nEdges:\n");

        if (request.edges() != null) {
            request.edges().forEach(edge ->
                    canvasData.append(String.format(
                            "- id:%s, source:%s, target:%s, label:%s%n",
                            edge.id(),
                            edge.source(),
                            edge.target(),
                            edge.label()
                    ))
            );
        }

        String prompt =
                """
                You are a senior software architect and systems analyst.

                Analyze the provided knowledge graph canvas.

                Infer:

                - Project summary
                - Project intent
                - Core entities
                - Relationships between entities
                - System architecture
                - Database design
                - Flowchart description
                - Development roadmap
                - Complete implementation prompt
                - Missing information

                Return ONLY valid JSON.

                Schema:

                {
                  "summary": "",
                  "intent": "",
                  "entities": [],
                  "relationships": [],
                  "architecture": "",
                  "databaseDesign": "",
                  "flowchart": "",
                  "roadmap": "",
                  "implementationPrompt": "",
                  "missingInformation": []
                }

                Canvas Data:
                """
                        + canvasData;

        try {

            String analysis = callGemini(prompt);

            return new AnalyzeResponse(
                    analysis,
                    Collections.emptyMap()
            );

        } catch (Exception e) {

            log.error("Gemini analysis failed", e);

            return new AnalyzeResponse(
                    """
                    {
                      "summary": "AI analysis failed",
                      "intent": "",
                      "entities": [],
                      "relationships": [],
                      "architecture": "",
                      "databaseDesign": "",
                      "flowchart": "",
                      "roadmap": "",
                      "implementationPrompt": "",
                      "missingInformation": [
                        "Gemini request failed"
                      ]
                    }
                    """,
                    Collections.emptyMap()
            );
        }
    }

    private String callGemini(String prompt) throws Exception {

        Map<String, Object> requestPayload = Map.of(
                "contents",
                new Object[]{
                        Map.of(
                                "parts",
                                new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                }
        );

        String requestBody =
                objectMapper.writeValueAsString(requestPayload);

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                        + apiKey;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response =
                HTTP_CLIENT.send(
                        request,
                        HttpResponse.BodyHandlers.ofString()
                );

        log.info("Gemini status: {}", response.statusCode());

        if (response.statusCode() != 200) {

            log.error("Gemini error body: {}", response.body());

            throw new RuntimeException(
                    "Gemini API returned status "
                            + response.statusCode()
            );
        }

        JsonNode root =
                objectMapper.readTree(response.body());

        JsonNode textNode =
                root.path("candidates")
                        .path(0)
                        .path("content")
                        .path("parts")
                        .path(0)
                        .path("text");

        if (textNode.isMissingNode() || textNode.isNull()) {

            throw new RuntimeException(
                    "Gemini response does not contain generated text"
            );
        }

        return textNode.asText();
    }
}