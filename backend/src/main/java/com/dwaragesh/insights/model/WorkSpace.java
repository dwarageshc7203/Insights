package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class WorkSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int workSpaceId;
    private String workSpaceName;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User owner;
    @OneToMany(mappedBy = "workSpace")
    private List<Canvas> canvas;
    @CreationTimestamp
    private Instant createdAt;
}
