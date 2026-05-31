package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.Component;
import com.dwaragesh.insights.model.Edge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EdgeRepository extends JpaRepository<Edge, Integer> {
    List<Edge> findByCanvas_CanvasId(int canvasCanvasId);
}
