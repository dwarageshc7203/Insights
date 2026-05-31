package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Edge.EdgeConnectionPatchRequest;
import com.dwaragesh.insights.dto.Edge.EdgeConnectionPatchResponse;
import com.dwaragesh.insights.dto.Edge.EdgeRequest;
import com.dwaragesh.insights.dto.Edge.EdgeResponse;
import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.Edge;
import com.dwaragesh.insights.repository.CanvasRepository;
import com.dwaragesh.insights.repository.EdgeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EdgeService {

    @Autowired
    private EdgeRepository repository;

    @Autowired
    private CanvasRepository canvasRepository;

    //create Edge
    public EdgeResponse createEdge(int canvasId, EdgeRequest request) {
        Canvas canvas = canvasRepository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        Edge edge = new Edge();
        edge.setEdgeName(request.edgeName());
        edge.setCanvas(canvas);
        edge.setColor(request.color());
        edge.setSourceId(request.sourceId());
        edge.setTargetId(request.targetId());

        Edge savedEdge = repository.save(edge);

        return new EdgeResponse(
                savedEdge.getEdgeId(),
                savedEdge.getEdgeName(),
                savedEdge.getColor(),
                savedEdge.getSourceId(),
                savedEdge.getTargetId()
        );
    }

    //patch edgeConnection
    public EdgeConnectionPatchResponse patchEdgeConnection(int edgeId, EdgeConnectionPatchRequest request) {
        Edge edge = repository.findById(edgeId)
                .orElseThrow(() -> new EntityNotFoundException("Edge not Found"));

        edge.setSourceId(request.sourceId());
        edge.setTargetId(request.targetId());

        Edge savedEdge = repository.save(edge);

        return new EdgeConnectionPatchResponse(
                savedEdge.getSourceId(),
                savedEdge.getTargetId()
        );
    }

    //delete Edge
    public void deleteEdge(int edgeId) {
        repository.deleteById(edgeId);
    }

}
