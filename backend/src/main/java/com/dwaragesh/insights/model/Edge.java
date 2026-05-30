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
    @JoinColumn(name = "canvasEdgeId")
    private Canvas canvas;
    private String color;
    @OneToOne
    private Component source;
    @OneToOne
    private Component target;
}