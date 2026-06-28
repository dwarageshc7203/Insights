package com.dwaragesh.insights.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(CorsConfig.class);

    /**
     * Primary CORS origin — the live frontend URL.
     * Set FRONTEND_URL in Render env vars to your Vercel deployment URL
     * (e.g. https://your-app.vercel.app).
     * Falls back to localhost:5173 only if the env var is not set.
     */
    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    /**
     * Active Spring profile — used to gate localhost fallbacks.
     * Localhost origins are only added in non-prod profiles to
     * keep the production allowed-origins list clean.
     */
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> allowedOrigins = new ArrayList<>();

        // 1. Primary origin: FRONTEND_URL (your Vercel deployment)
        if (frontendUrl != null && !frontendUrl.isBlank()) {
            allowedOrigins.add(frontendUrl.trim());
            log.info("CORS: primary origin = {}", frontendUrl.trim());
        }

        // 2. Legacy ALLOWED_ORIGINS env var (comma-separated) — backward compatibility
        String legacyOrigins = System.getenv("ALLOWED_ORIGINS");
        if (legacyOrigins != null && !legacyOrigins.isBlank()) {
            for (String origin : legacyOrigins.split(",")) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty() && !allowedOrigins.contains(trimmed)) {
                    allowedOrigins.add(trimmed);
                    log.info("CORS: additional origin (ALLOWED_ORIGINS) = {}", trimmed);
                }
            }
        }

        // 3. Localhost fallbacks — only added in dev/test profiles.
        //    In production, localhost origins are intentionally excluded.
        boolean isProd = activeProfile.contains("prod");
        if (!isProd) {
            if (!allowedOrigins.contains("http://localhost:5173")) {
                allowedOrigins.add("http://localhost:5173");
            }
            if (!allowedOrigins.contains("http://localhost:3000")) {
                allowedOrigins.add("http://localhost:3000");
            }
            log.debug("CORS: localhost origins added (non-prod profile: {})", activeProfile);
        }

        log.info("CORS: allowed origins = {}", allowedOrigins);

        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}