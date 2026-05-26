package com.dwaragesh.insights.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Node {

    @Id
    private int nid;
    private String nName;
    private int uid;

    @CreationTimestamp
    private Instant createdAt;

}