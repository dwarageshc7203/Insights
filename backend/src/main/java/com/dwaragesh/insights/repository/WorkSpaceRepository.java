package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.WorkSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkSpaceRepository extends JpaRepository<WorkSpace, Integer> {
    List<WorkSpace> findByOwner_UserId(UUID userId);
    WorkSpace findByWorkSpaceId(int workSpaceId);
}
