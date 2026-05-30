package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.Canvas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CanvasRepository extends JpaRepository<Canvas, Integer> {
    List<Canvas> findByWorkSpace_WorkSpaceId(int workSpaceId);
    List<Canvas> findByWorkSpace_Owner_UserId(int userId);
}
