package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Node {

    @Id
    private int nid;
    private int uid;

    private String contents;
    private int[] position;

    @CreationTimestamp
    private Instant createdAt;

    @ManyToOne
    @JoinColumn(name = "cid", nullable = false)
    private Canvas canvas;

}