package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Edge {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int edgeId;
    private String edgeName;
    @ManyToOne
    @JoinColumn(name = "canvas_id")
    private Canvas canvas;
    private String color;
    private int sourceId;
    private int targetId;
    private String sourceHandle;
    private String targetHandle;
}