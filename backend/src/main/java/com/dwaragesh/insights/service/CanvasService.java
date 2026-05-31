package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Canvas.CanvasDetailsResponse;
import com.dwaragesh.insights.dto.Canvas.CanvasRequest;
import com.dwaragesh.insights.dto.Canvas.CanvasResponse;
import com.dwaragesh.insights.dto.Component.ComponentResponse;
import com.dwaragesh.insights.dto.Edge.EdgeResponse;
import com.dwaragesh.insights.model.*;
import com.dwaragesh.insights.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanvasService {

    @Autowired
    private CanvasRepository repository;

    @Autowired
    private WorkSpaceRepository workSpaceRepository;

    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private EdgeRepository edgeRepository;

    //create Canvas
    public CanvasResponse createCanvas(int workSpaceId, CanvasRequest request) {
        WorkSpace workSpace = workSpaceRepository.findById(workSpaceId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Canvas canvas = new Canvas();
        canvas.setWorkSpace(workSpace);
        canvas.setCanvasName(request.canvasName());

        Canvas savedCanvas = repository.save(canvas);

        return new CanvasResponse(
                savedCanvas.getCanvasId(),
                savedCanvas.getCanvasName(),
                workSpaceId
        );
    }

    //get Canvas
    public CanvasResponse getCanvas(int canvasId) {
        Canvas canvas = repository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        return new CanvasResponse(
                canvas.getCanvasId(),
                canvas.getCanvasName(),
                canvas.getWorkSpace().getWorkSpaceId()
        );
    }

    //getAll Canvas
    public List<CanvasResponse> getAllCanvas(int workSpaceId) {
        List<Canvas> canvasList = repository.findByWorkSpace_WorkSpaceId(workSpaceId);
        return canvasList.stream()
                .map(canvas -> new CanvasResponse(
                        canvas.getCanvasId(),
                        canvas.getCanvasName(),
                        canvas.getWorkSpace().getWorkSpaceId()
                ))
                .toList();
    }

    //get canvasDetails
    public CanvasDetailsResponse loadCanvas (int canvasId) {
        Canvas canvas = repository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        List<ComponentResponse> components = componentRepository.findByCanvas_CanvasId(canvasId)
                .stream()
                .map(c -> new ComponentResponse(
                        c.getComponentId(),
                        c.getComponentName(),
                        c.getType(),
                        c.getTextContent(),
                        c.getImgUrl(),
                        c.getColor(),
                        c.getPositionX(),
                        c.getPositionY()
                ))
                .toList();

        List<EdgeResponse> edges = edgeRepository.findByCanvas_CanvasId(canvasId)
                .stream()
                .map(e -> new EdgeResponse(
                        e.getEdgeId(),
                        e.getEdgeName(),
                        e.getColor(),
                        e.getSourceId(),
                        e.getTargetId()
                ))
                .toList();

        return new CanvasDetailsResponse(
                canvasId,
                canvas.getCanvasName(),
                canvas.getWorkSpace().getWorkSpaceId(),
                components,
                edges
        );
    }

    //delete Canvas
    public void deleteCanvas(int canvasId) {
        Canvas canvas = repository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        repository.deleteById(canvasId);
    }


}
