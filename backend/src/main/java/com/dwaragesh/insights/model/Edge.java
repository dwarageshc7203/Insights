package com.dwaragesh.insights.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Edge {

    @Id
    private int eid;
    private String eName;
    private int uid;

    @CreationTimestamp
    private Instant createdAt;

}