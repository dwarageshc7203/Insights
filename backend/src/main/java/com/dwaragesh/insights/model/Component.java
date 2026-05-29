package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Data
@Entity
public class Component {

    @Id
    private int componentId;
    private int userId;

    private String contents;
    private int[] position;

    @CreationTimestamp
    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "canvasId", nullable = false)
    private Canvas canvas;

}