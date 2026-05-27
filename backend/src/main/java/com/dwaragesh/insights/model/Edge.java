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
    private int eid;
    private int uid;

//    @ManyToOne
//    @JoinColumn(name = "node", nullable = false)
//    private List<Node> sources;

    private List<Node> destinations;

    @CreationTimestamp
    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "cid", nullable = false)
    private Canvas canvas;

}