package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Edge.EdgeRequest;
import com.dwaragesh.insights.service.EdgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/edge")
public class EdgeController {

    @Autowired
    private EdgeService service;

    //create edge
    @PostMapping
    public ResponseEntity<Void> createEdge(int canvasId, EdgeRequest request) {
        System.out.println("Called createEdge method");
        service.createEdge(canvasId, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //delete edge
    @DeleteMapping("/{edgeId}")
    public ResponseEntity<Void> deleteEdge(int edgeId) {
        System.out.println("Called deleteEdge method");
        service.deleteEdge(edgeId);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

}
