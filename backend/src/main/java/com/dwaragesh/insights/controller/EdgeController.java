package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Edge.EdgeRequest;
import com.dwaragesh.insights.dto.Edge.EdgeResponse;
import com.dwaragesh.insights.service.EdgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/edge")
public class EdgeController {

    @Autowired
    private EdgeService service;

    //create edge
    @PostMapping("/canvas/{canvasId}")
    public ResponseEntity<EdgeResponse> createEdge(@PathVariable int canvasId, @RequestBody EdgeRequest request) {
        return new ResponseEntity<>(service.createEdge(canvasId, request), HttpStatus.CREATED);
    }

    //delete edge
    @DeleteMapping("/{edgeId}")
    public ResponseEntity<Void> deleteEdge(@PathVariable int edgeId) {
        service.deleteEdge(edgeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
