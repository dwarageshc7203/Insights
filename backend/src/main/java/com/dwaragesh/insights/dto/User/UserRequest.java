package com.dwaragesh.insights.dto.User;

import java.util.UUID;

public record UserRequest (
    UUID userId,
    String userName,
    String email
) {
}
