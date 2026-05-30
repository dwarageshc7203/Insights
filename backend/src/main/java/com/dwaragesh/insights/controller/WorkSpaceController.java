package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceRequest;
import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceResponse;
import com.dwaragesh.insights.repository.WorkSpaceRepository;
import com.dwaragesh.insights.service.WorkSpaceService;
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
@RequestMapping("/workspace")
public class WorkSpaceController {

    @Autowired
    private WorkSpaceService service;

    @Autowired
    private WorkSpaceRepository repository;

    //Create new WorkSpace
    @PostMapping
    public ResponseEntity<WorkSpaceResponse> createWorkSpace(int userId, WorkSpaceRequest request) {
        System.out.println("WorkSpace Create controller called");
        return new ResponseEntity<>(service.createWorkSpace(userId, request), HttpStatus.CREATED);
    }

    //Get WorkSpace
    @GetMapping("/{workSpaceId}")
    public ResponseEntity<WorkSpaceResponse> getWorkSpace(int workSpaceId) {
        System.out.println("WorkSpace Get Controller called");
        return new ResponseEntity<>(service.getWorkSpace(workSpaceId), HttpStatus.FOUND);
    }

    //Get all WorkSpace
    @GetMapping("/user/{uid}")
    public ResponseEntity<List<WorkSpaceResponse>> getAllWorkSpaces(int uid) {
        System.out.println("WorkSpace GetAll Controller called");
        return new ResponseEntity<>(service.getAllWorkSpace(uid), HttpStatus.FOUND);
    }

    //Delete WorkSpace
    @DeleteMapping("/{workSpaceId}")
    public ResponseEntity<Void> deleteWorkSpace(int workSpaceId) {
        System.out.println("WorkSpace Delete controller called");
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
