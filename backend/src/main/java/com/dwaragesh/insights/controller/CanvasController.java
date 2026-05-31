package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Canvas.CanvasDetailsResponse;
import com.dwaragesh.insights.dto.Canvas.CanvasRequest;
import com.dwaragesh.insights.dto.Canvas.CanvasResponse;
import com.dwaragesh.insights.service.CanvasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/canvas")
public class CanvasController {

    @Autowired
    private CanvasService service;

    //create Canvas
    @PostMapping("/workspace/{workSpaceId}")
    public ResponseEntity<CanvasResponse> createCanvas(@PathVariable int workSpaceId, @RequestBody CanvasRequest canvasRequest) {
        return new ResponseEntity<>(service.createCanvas(workSpaceId, canvasRequest), HttpStatus.CREATED);
    }

    //get Canvas
    @GetMapping("/{canvasId}")
    public ResponseEntity<CanvasResponse> getCanvas(@PathVariable int canvasId) {
        return new ResponseEntity<>(service.getCanvas(canvasId), HttpStatus.OK);
    }

    //get all Canvas
    @GetMapping("/workspace/{workSpaceId}")
    public ResponseEntity<List<CanvasResponse>> getAllCanvas(@PathVariable int workSpaceId) {
        return new ResponseEntity<>(service.getAllCanvas(workSpaceId), HttpStatus.OK);
    }

    //get Canvas Details - load Canvas
    @GetMapping("/{canvasId}/load")
    public ResponseEntity<CanvasDetailsResponse> loadCanvas(@PathVariable int canvasId) {
        return new ResponseEntity<>(service.loadCanvas(canvasId), HttpStatus.OK);
    }

    @DeleteMapping("/{canvasId}")
    public ResponseEntity<Void> deleteCanvas(@PathVariable int canvasId) {
        service.deleteCanvas(canvasId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
