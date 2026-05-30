package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.WorkSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkSpaceRepository extends JpaRepository<WorkSpace, Integer> {
    List<WorkSpace> findByOwner_UserId(int userId);
    WorkSpace findByWorkSpaceId(int workSpaceId);
}
