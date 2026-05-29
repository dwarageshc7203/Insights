package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Component.ComponentRequest;
import com.dwaragesh.insights.dto.Component.ComponentResponse;
import com.dwaragesh.insights.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ComponentController {

    @Autowired
    private ComponentService service;

    //create component
    @PostMapping
    public ResponseEntity<Void> createComponent(ComponentRequest request) {
        System.out.println("Called createComponent method");
        return new ResponseEntity<>(service.createComponent(request), HttpStatus.CREATED);
    }

    //get component
    @GetMapping
    public ResponseEntity<ComponentResponse> getComponent(int componentId) {
        System.out.println("Called getComponent method");
        return new ResponseEntity<>(service.getComponent(componentId), HttpStatus.FOUND);
    }

    //getAll component
    @GetMapping
    public ResponseEntity<List<ComponentResponse>> getAllComponent(int userId) {
        System.out.println("Called getAllComponent method");
        return new ResponseEntity<>(service.getAllComponent(userId), HttpStatus.FOUND);
    }

}
