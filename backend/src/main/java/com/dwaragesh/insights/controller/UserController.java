package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.User.UserRequest;
import com.dwaragesh.insights.dto.User.UserResponse;
import com.dwaragesh.insights.repository.UserRepository;
import com.dwaragesh.insights.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepository repository;

    @PostMapping("/sync")
    public UserResponse syncUser(@RequestBody UserRequest request) {
        return service.syncUser(request);
    }

}
