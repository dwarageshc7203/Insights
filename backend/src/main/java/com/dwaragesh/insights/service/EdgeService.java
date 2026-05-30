package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Edge.EdgeRequest;
import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.Edge;
import com.dwaragesh.insights.repository.CanvasRepository;
import com.dwaragesh.insights.repository.EdgeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EdgeService {

    @Autowired
    private EdgeRepository repository;

    @Autowired
    private CanvasRepository canvasRepository;

    public void createEdge(int canvasId, EdgeRequest request) {
        Canvas canvas = canvasRepository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        Edge edge = new Edge();
        edge.setEdgeName(request.edgeName());
        edge.setCanvas(canvas);
        edge.setColor(request.color());
        edge.setSource(request.source());
        edge.setTarget(request.target());

        repository.save(edge);
        System.out.println("Edge created");
    }

    public void deleteEdge(int edgeId) {
        repository.deleteById(edgeId);
        System.out.println("Edge deleted");
    }

}
