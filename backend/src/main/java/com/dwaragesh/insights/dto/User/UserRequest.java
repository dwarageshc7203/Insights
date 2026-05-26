package com.dwaragesh.insights.dto.User;

public record UserRequest (
    String uname,
    String email,
    String password
) {
}
