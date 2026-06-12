package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Data
@Entity
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int componentId;
    private String componentName;
    @ManyToOne
    @JoinColumn(name = "canvasId")
    private Canvas canvas;
    private String type;
    private String shapeType;
    private String textContent;
    private String imgUrl;
    private String color;
    private double positionX;
    private double positionY;
    private double width;
    private double height;
}