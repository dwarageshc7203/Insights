package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceRequest;
import com.dwaragesh.insights.dto.WorkSpace.WorkSpaceResponse;
import com.dwaragesh.insights.model.User;
import com.dwaragesh.insights.model.WorkSpace;
import com.dwaragesh.insights.repository.UserRepository;
import com.dwaragesh.insights.repository.WorkSpaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkSpaceService {

    @Autowired
    private WorkSpaceRepository repository;

    @Autowired
    private UserRepository userRepo;

    //Create new WorkSpace => Done
    public WorkSpaceResponse createWorkSpace(UUID userId, WorkSpaceRequest request) {
        User user = (User) userRepo.findUserByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        WorkSpace workSpace = new WorkSpace();
        workSpace.setOwner(user);
        workSpace.setWorkSpaceName(request.workSpaceName());

        WorkSpace savedWorkSpace = repository.save(workSpace);

        return new WorkSpaceResponse(
                workSpace.getWorkSpaceId(),
                workSpace.getWorkSpaceName(),
                userId,
                workSpace.getCreatedAt()
        );
    }

    //Get WorkSpace => done
    public WorkSpaceResponse getWorkSpace(int workSpaceId) {
        WorkSpace workSpace = repository.findById(workSpaceId)
                .orElseThrow(() -> new EntityNotFoundException("WorkSpace not found"));

        return new WorkSpaceResponse(
                workSpace.getWorkSpaceId(),
                workSpace.getWorkSpaceName(),
                workSpace.getOwner().getUserId(),
                workSpace.getCreatedAt()
        );
    }

    //Get All WorkSpaces
    public List<WorkSpaceResponse> getAllWorkSpace(UUID userId) {
        List<WorkSpace> workSpaces = repository.findByOwner_UserId(userId);
        return workSpaces.stream()
                .map(workSpace -> new WorkSpaceResponse(
                        workSpace.getWorkSpaceId(),
                        workSpace.getWorkSpaceName(),
                        userId,
                        workSpace.getCreatedAt()
                ))
                .toList();
    }

    //delete WorkSpace
    public void deleteWorkSpace(int workSpaceId) {
        WorkSpace workSpace = repository.findById(workSpaceId)
                .orElseThrow(() -> new EntityNotFoundException("WorkSpace not found"));

        repository.delete(workSpace);
    }

    //update WorkSpace
    public WorkSpaceResponse updateWorkSpace(int workSpaceId, String newName) {
        WorkSpace workSpace = repository.findById(workSpaceId)
                .orElseThrow(() -> new EntityNotFoundException("WorkSpace not found"));
        workSpace.setWorkSpaceName(newName);
        WorkSpace saved = repository.save(workSpace);
        return new WorkSpaceResponse(
                saved.getWorkSpaceId(),
                saved.getWorkSpaceName(),
                saved.getOwner().getUserId(),
                saved.getCreatedAt()
        );
    }
}
