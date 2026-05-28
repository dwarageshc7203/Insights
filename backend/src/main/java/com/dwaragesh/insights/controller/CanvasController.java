package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Canvas.CanvasRequest;
import com.dwaragesh.insights.dto.Canvas.CanvasResponse;
import com.dwaragesh.insights.service.CanvasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CanvasController {

    @Autowired
    private CanvasService service;

    //create Canvas
    @PostMapping
    public ResponseEntity<CanvasResponse> createCanvas(int uid, CanvasRequest canvasRequest) {
        System.out.println("Create Canvas Method called");
        return new ResponseEntity<>(service.createCanvas(uid, canvasRequest), HttpStatus.ACCEPTED);
    }

    //get Canvas
    @GetMapping
    public ResponseEntity<CanvasResponse> getCanvas(int cid) {
        System.out.println("Get Canvas Method called");
        return new ResponseEntity<>(service.getCanvas(cid), HttpStatus.FOUND);
    }

    //get all Canvas
    @GetMapping
    public ResponseEntity<List<CanvasResponse>> getAllCanvas(int uid) {
        System.out.println("Get All Canvas Method called");
        return new ResponseEntity<>(service.getAllCanvas(uid), HttpStatus.FOUND);
    }

}
