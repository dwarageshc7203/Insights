package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.Component.*;
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
    @PostMapping("/canvas/{canvasId}")
    public ResponseEntity<ComponentResponse> createComponent(@PathVariable int canvasId, @RequestBody ComponentRequest request) {
        return new ResponseEntity<>(service.createComponent(canvasId, request), HttpStatus.CREATED);
    }

    //get Component
    @GetMapping("/{componentId}")
    public ResponseEntity<ComponentResponse> getComponent(@PathVariable int componentId) {
        return new ResponseEntity<>(service.getComponent(componentId), HttpStatus.OK);
    }

    //patch componentPosition
    @PatchMapping("/{componentId}/position")
    public ResponseEntity<ComponentPositionPatchResponse> patchComponentPosition(@PathVariable int componentId, @RequestBody ComponentPositionPatchRequest request) {
        return new ResponseEntity<>(service.patchComponentPosition(componentId, request), HttpStatus.OK);
    }

    //patch componentSize
    @PatchMapping("/{componentId}/size")
    public ResponseEntity<ComponentSizePatchResponse> patchComponentSize(@PathVariable int componentId, @RequestBody ComponentSizePatchRequest request) {
        return new ResponseEntity<>(service.patchComponentSize(componentId, request), HttpStatus.OK);
    }

    //patch componentColor
    @PatchMapping("/{componentId}/color")
    public ResponseEntity<ComponentColorPatchResponse> patchComponentSize(@PathVariable int componentId, @RequestBody ComponentColorPatchRequest request) {
        return new ResponseEntity<>(service.patchComponentColor(componentId, request), HttpStatus.OK);
    }

    //patch imageComponent
    @PatchMapping("/{componentId}/image")
    public ResponseEntity<ComponentImagePatchResponse> patchComponentSize(@PathVariable int componentId, @RequestBody ComponentImagePatchRequest request) {
        return new ResponseEntity<>(service.patchImageComponent(componentId, request), HttpStatus.OK);
    }

    //delete Component
    @DeleteMapping("/{componentId}")
    public ResponseEntity<Void> deleteComponent(@PathVariable int componentId) {
        service.deleteComponent(componentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
