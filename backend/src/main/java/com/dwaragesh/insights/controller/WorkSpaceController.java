package com.dwaragesh.insights.controller;

import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceRequest;
import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceResponse;
import com.dwaragesh.insights.repository.WorkSpaceRepository;
import com.dwaragesh.insights.service.WorkSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class WorkSpaceController {

    @Autowired
    private WorkSpaceService service;

    @Autowired
    private WorkSpaceRepository repository;

    //Create new WorkSpace
    @PostMapping
    public ResponseEntity<WorkSpaceResponse> createWorkSpace(int uid, WorkSpaceRequest request) {
        System.out.println("WorkSpace Create controller called");
        return new ResponseEntity<>(service.createWorkSpace(uid, request), HttpStatus.CREATED);
    }

    //Get WorkSpace
    @GetMapping
    public ResponseEntity<WorkSpaceResponse> getWorkSpace(int wid) {
        System.out.println("WorkSpace Get Controller called");
        return new ResponseEntity<>(service.getWorkSpace(wid));
    }

    //Get all WorkSpace
    @GetMapping
    public ResponseEntity<List<WorkSpaceResponse>> getAllWorkSpaces(int uid) {
        System.out.println("WorkSpace GetAll Controller called");
        return new ResponseEntity<>(service.getAllWorkSpace(uid));
    }

    //Update WorkSpace
    @GetMapping
    public ResponseEntity<WorkSpaceResponse> updateWorkSpace(int wid) {
        System.out.println("WorkSpace Delete controller called");
        return new ResponseEntity<>(service.updateWorkSpace(wid));
    }

    //Delete WorkSpace
    @DeleteMapping
    public ResponseEntity<Void> deleteWorkSpace(int wid) {
        System.out.println("WorkSpace Delete controller called");
        return new ResponseEntity<>(service.deleteWorkSpace(wid));
    }

}
