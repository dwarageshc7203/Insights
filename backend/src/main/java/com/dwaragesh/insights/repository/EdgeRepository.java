package com.dwaragesh.insights.repository;

import com.dwaragesh.insights.model.Edge;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EdgeRepository extends JpaRepository<Edge, Integer> {
    List<Edge> findByCanvas_CanvasId(int canvasCanvasId);

    @Transactional
    @Modifying
    @Query("delete from Edge e where e.sourceId = :componentId or e.targetId = :componentId")
    void deleteByComponentId(@Param("componentId") int componentId);
}
