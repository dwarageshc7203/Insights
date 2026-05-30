package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Component.ComponentRequest;
import com.dwaragesh.insights.dto.Component.ComponentResponse;
import com.dwaragesh.insights.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/component")
public class ComponentController {

    @Autowired
    private ComponentService service;

    //create Component
    @PostMapping
    public ResponseEntity<Void> createComponent(int canvasId, ComponentRequest request) {
        System.out.println("Called createComponent method");
        service.createComponent(canvasId, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //get Component
    @GetMapping("/{componentId}")
    public ResponseEntity<ComponentResponse> getComponent(int componentId) {
        System.out.println("Called getComponent method");
        return new ResponseEntity<>(service.getComponent(componentId), HttpStatus.FOUND);
    }

    //delete Component
    @DeleteMapping("/{componentId}")
    public ResponseEntity<Void> deleteComponent(int componentId) {
        System.out.println("Called getComponent method");
        service.getComponent(componentId);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    //getAll component
//    @GetMapping
//    public ResponseEntity<List<ComponentResponse>> getAllComponent(int userId) {
//        System.out.println("Called getAllComponent method");
//        return new ResponseEntity<>(service.getAllComponent(userId), HttpStatus.FOUND);
//    }

    //updateComponent
//    @PutMapping
//    public ResponseEntity<Void> updateComponent(int componentId, ComponentRequest request) {
//        System.out.println("Called updateComponent method");
//        return new ResponseEntity<>(service.updateComponent(componentId, request), HttpStatus.FOUND);
//    }

}
