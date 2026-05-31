package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Integer> {
    List<Component> findByCanvas_CanvasId(int canvasCanvasId);
}
