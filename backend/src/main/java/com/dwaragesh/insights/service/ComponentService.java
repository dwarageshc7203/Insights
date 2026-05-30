package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.Component.ComponentRequest;
import com.dwaragesh.insights.dto.Component.ComponentResponse;
import com.dwaragesh.insights.model.Canvas;
import com.dwaragesh.insights.model.Component;
import com.dwaragesh.insights.repository.CanvasRepository;
import com.dwaragesh.insights.repository.ComponentRepository;
import com.dwaragesh.insights.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {

    @Autowired
    private ComponentRepository repository;

    @Autowired
    private CanvasRepository canvasRepository;

    //create Component
    public void createComponent(int canvasId, ComponentRequest request) {
        Canvas canvas = canvasRepository.findById(canvasId)
                .orElseThrow(() -> new EntityNotFoundException("Canvas not found"));

        Component component = new Component();
        component.setComponentName(request.componentName());
        component.setCanvas(canvas);
        component.setType(request.componentType());
        component.setTextContent(request.textContent());
        component.setImgUrl(request.imgUrl());
        component.setColor(request.color());
        component.setPositionX(request.positionX());
        component.setPositionY(request.positionY());

        repository.save(component);
        System.out.println("Component created");
    }

    //get Component
    public ComponentResponse getComponent(int componentId) {
        Component component = repository.findById(componentId)
                .orElseThrow(() -> new EntityNotFoundException("Component not found"));

        return new ComponentResponse(
                component.getComponentId(),
                component.getComponentName(),
                component.getType(),
                component.getTextContent(),
                component.getImgUrl(),
                component.getColor(),
                component.getPositionX(),
                component.getPositionY()
        );
    }

    //delete Component
    public void deleteComponent(int componentId) {
        repository.deleteById(componentId);
        System.out.println("Component deleted");
    }
}
