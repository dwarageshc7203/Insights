package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceRequest;
import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceResponse;
import com.dwaragesh.insights.model.User;
import com.dwaragesh.insights.model.WorkSpace;
import com.dwaragesh.insights.repository.UserRepository;
import com.dwaragesh.insights.repository.WorkSpaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

@Service
public class WorkSpaceService {

    @Autowired
    private WorkSpaceRepository repository;

    @Autowired
    private UserRepository userRepo;


    public WorkSpaceResponse createWorkSpace(int uid, WorkSpaceRequest request) {
        User user = userRepo.findById(uid)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        WorkSpace workSpace = new WorkSpace();
        workSpace.setOwner(user);
        workSpace.setWName(request.wName());

        WorkSpace savedWorkSpace = repository.save(workSpace);

        return new WorkSpaceResponse(
                workSpace.getWid(),
                workSpace.getWName(),
                workSpace.getWid()
        );
    }

    public HttpStatusCode getWorkSpace(int wid) {
        return null;
    }

    public HttpStatusCode getAllWorkSpace(int uid) {
    }

    public HttpStatusCode deleteWorkSpace(int wid) {
    }

    public HttpStatusCode updateWorkSpace(int wid) {
    }
}
