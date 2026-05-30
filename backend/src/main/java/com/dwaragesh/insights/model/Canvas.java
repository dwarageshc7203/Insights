package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Canvas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int canvasId;
    private String canvasName;
    @ManyToOne
    @JoinColumn(name = "workSpaceId")
    private WorkSpace workSpace;
    @OneToMany(mappedBy = "canvas")
    List<Component> components;
    @OneToMany(mappedBy = "canvas")
    List<Edge> edges;
}
