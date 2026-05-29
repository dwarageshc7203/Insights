package com.dwaragesh.insights.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;


import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Edge {

    @Id
    private int edgeId;
    private int userId;

//    @ManyToOne
//    @JoinColumn(name = "node", nullable = false)
//    private List<Node> sources;

    private List<Component> destinations;

    @CreationTimestamp
    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "canvasId", nullable = false)
    private Canvas canvas;

}