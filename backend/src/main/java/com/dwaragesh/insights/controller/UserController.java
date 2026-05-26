package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.repository.UserRepository;
import com.dwaragesh.insights.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepository repository;
}
