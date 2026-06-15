package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Component.*;
import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.Component;
import com.dwaragesh.insights.model.Edge;
import com.dwaragesh.insights.repository.CanvasRepository;
import com.dwaragesh.insights.repository.ComponentRepository;
import com.dwaragesh.insights.repository.EdgeRepository;
import com.dwaragesh.insights.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComponentService {

    @Autowired
    private ComponentRepository repository;

    @Autowired
    private CanvasRepository canvasRepository;

    @Autowired
    private EdgeRepository edgeRepository;

    //create Component
    public ComponentResponse createComponent(int canvasId, ComponentRequest request) {
        Canvas canvas = canvasRepository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        Component component = new Component();
        component.setComponentName(request.componentName());
        component.setCanvas(canvas);
        component.setType(request.type());
        component.setShapeType(request.shapeType());
        component.setTextContent(request.textContent());
        component.setImgUrl(request.imgUrl());
        component.setColor(request.color());
        component.setPositionX(request.positionX());
        component.setPositionY(request.positionY());

        Component savedComponent = repository.save(component);

        return new ComponentResponse(
                savedComponent.getComponentId(),
                savedComponent.getComponentName(),
                savedComponent.getType(),
                savedComponent.getShapeType(),
                savedComponent.getTextContent(),
                savedComponent.getImgUrl(),
                savedComponent.getColor(),
                savedComponent.getPositionX(),
                savedComponent.getPositionY(),
                savedComponent.getWidth(),
                savedComponent.getHeight()
        );
    }

    //get Component
    public ComponentResponse getComponent(int componentId) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        return new ComponentResponse(
                component.getComponentId(),
                component.getComponentName(),
                component.getType(),
                component.getShapeType(),
                component.getTextContent(),
                component.getImgUrl(),
                component.getColor(),
                component.getPositionX(),
                component.getPositionY(),
                component.getWidth(),
                component.getHeight()
        );
    }

    //patch componentPosition
    public ComponentPositionPatchResponse patchComponentPosition(int componentId, ComponentPositionPatchRequest request) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        component.setPositionX(request.positionX());
        component.setPositionY(request.positionY());

        Component savedComponent = repository.save(component);

        return new ComponentPositionPatchResponse(
                savedComponent.getPositionX(),
                savedComponent.getPositionY()
        );
    }

    //patch componentTextContent
    public ComponentTextPatchResponse patchComponentTextContent(int componentId, ComponentTextPatchRequest request) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        component.setTextContent(request.textContent());

        Component savedComponent = repository.save(component);

        return new ComponentTextPatchResponse(
                savedComponent.getTextContent()
        );
    }

    //patch componentSize
    public ComponentSizePatchResponse patchComponentSize(int componentId, ComponentSizePatchRequest request) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        component.setWidth(request.width());
        component.setHeight(request.height());

        Component savedComponent = repository.save(component);

        return new ComponentSizePatchResponse(
                savedComponent.getWidth(),
                savedComponent.getHeight()
        );
    }

    //patch componentColor
    public ComponentColorPatchResponse patchComponentColor(int componentId, ComponentColorPatchRequest request) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        component.setColor(request.color());

        Component savedComponent = repository.save(component);

        return new ComponentColorPatchResponse(
                savedComponent.getColor()
        );
    }

    //patch imageComponent
    public ComponentImagePatchResponse patchImageComponent(int componentId, ComponentImagePatchRequest request) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        component.setImgUrl(request.imgUrl());

        Component savedComponent = repository.save(component);

        return new ComponentImagePatchResponse(
                savedComponent.getImgUrl()
        );
    }

    public void deleteComponent(int componentId) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        edgeRepository.deleteByComponentId(componentId);
        repository.delete(component);
    }

}
