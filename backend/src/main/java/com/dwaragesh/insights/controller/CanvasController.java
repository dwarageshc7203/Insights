package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Canvas.CanvasRequest;
import com.dwaragesh.insights.dto.Canvas.CanvasResponse;
import com.dwaragesh.insights.service.CanvasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/canvas")
public class CanvasController {

    @Autowired
    private CanvasService service;

    //create Canvas
    @PostMapping
    public ResponseEntity<CanvasResponse> createCanvas(int workSpaceId, CanvasRequest canvasRequest) {
        System.out.println("Create Canvas Method called");
        return new ResponseEntity<>(service.createCanvas(workSpaceId, canvasRequest), HttpStatus.ACCEPTED);
    }

    //get Canvas
    @GetMapping("/{canvasId}")
    public ResponseEntity<CanvasResponse> getCanvas(int canvasId) {
        System.out.println("Get Canvas Method called");
        return new ResponseEntity<>(service.getCanvas(canvasId), HttpStatus.FOUND);
    }

    //get all Canvas
    @GetMapping("/workspace/{workSpaceId}")
    public ResponseEntity<List<CanvasResponse>> getAllCanvas(int workSpaceId) {
        System.out.println("Get All Canvas Method called");
        return new ResponseEntity<>(service.getAllCanvas(workSpaceId), HttpStatus.FOUND);
    }

    @DeleteMapping("/{canvasId}")
    public ResponseEntity<Void> deleteCanvas(int canvasId) {
        System.out.println("delete Canvas Method called");
        service.deleteCanvas(canvasId);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

}
