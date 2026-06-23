package com.dwaragesh.insights.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {

    /**
     * Primary origin comes from FRONTEND_URL (set on Render and in local .env).
     * Injected via application.properties: frontend.url=${FRONTEND_URL:http://localhost:5173}
     */
    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Build allowed origins list:
        //   1. FRONTEND_URL (from application.properties / env var) — always present
        //   2. Legacy ALLOWED_ORIGINS env var (comma-separated) — kept for backward compatibility
        //   3. Localhost fallbacks for local development
        List<String> allowedOrigins = new ArrayList<>();

        // Add FRONTEND_URL origin
        if (frontendUrl != null && !frontendUrl.isBlank()) {
            allowedOrigins.add(frontendUrl.trim());
        }

        // Legacy ALLOWED_ORIGINS support (comma-separated)
        String legacyOrigins = System.getenv("ALLOWED_ORIGINS");
        if (legacyOrigins != null && !legacyOrigins.isBlank()) {
            for (String origin : legacyOrigins.split(",")) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty() && !allowedOrigins.contains(trimmed)) {
                    allowedOrigins.add(trimmed);
                }
            }
        }

        // Always allow localhost variants for local development
        if (!allowedOrigins.contains("http://localhost:5173")) {
            allowedOrigins.add("http://localhost:5173");
        }
        if (!allowedOrigins.contains("http://localhost:3000")) {
            allowedOrigins.add("http://localhost:3000");
        }

        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}