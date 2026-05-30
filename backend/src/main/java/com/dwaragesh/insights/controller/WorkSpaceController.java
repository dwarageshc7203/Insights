package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceRequest;
import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceResponse;
import com.dwaragesh.insights.repository.WorkSpaceRepository;
import com.dwaragesh.insights.service.WorkSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/workspace")
public class WorkSpaceController {

    @Autowired
    private WorkSpaceService service;

    @Autowired
    private WorkSpaceRepository repository;

    //Create new WorkSpace
    @PostMapping("/{userId}")
    public ResponseEntity<Void> createWorkSpace(@RequestParam UUID userId, @RequestBody WorkSpaceRequest request) {
        service.createWorkSpace(userId, request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //Get WorkSpace
    @GetMapping("/{workSpaceId}")
    public ResponseEntity<WorkSpaceResponse> getWorkSpace(int workSpaceId) {
        return new ResponseEntity<>(service.getWorkSpace(workSpaceId), HttpStatus.FOUND);
    }

    //Get all WorkSpace
    @GetMapping("/user/{uid}")
    public ResponseEntity<List<WorkSpaceResponse>> getAllWorkSpaces(UUID userId) {
        return new ResponseEntity<>(service.getAllWorkSpace(userId), HttpStatus.FOUND);
    }

    //Delete WorkSpace
    @DeleteMapping("/{workSpaceId}")
    public ResponseEntity<Void> deleteWorkSpace(int workSpaceId) {
        service.deleteWorkSpace(workSpaceId);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

//Update WorkSpace
//    @GetMapping
//    public ResponseEntity<Void> updateWorkSpace(int wid) {
//        System.out.println("WorkSpace Delete controller called");
//        return new ResponseEntity<>(service.updateWorkSpace(wid), HttpStatus.ACCEPTED);
//    }
//
}
