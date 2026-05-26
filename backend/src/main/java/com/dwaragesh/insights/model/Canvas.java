package com.dwaragesh.insights.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Canvas {

    @Id
    private int cid;
    private String cName;
    private int uid;
    private List<User> collaborators;

    @CreationTimestamp
    private Instant createdAt;

    private List<Node> nodes;
    private List<Edge> edges;
}
