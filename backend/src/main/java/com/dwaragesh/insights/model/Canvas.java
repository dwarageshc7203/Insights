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
    private int canvasId;
    private String canvasName;
    private int userId;
//    private List<User> collaborators;

    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "canvas", cascade = CascadeType.ALL)
    private List<Component> nodes; //need to be changed to accomodate other components as well

    @OneToMany(mappedBy = "canvas", cascade = CascadeType.ALL)
    private List<Edge> edges;

    @ManyToOne
    @JoinColumn(name = "wid", nullable = false)
    private WorkSpace workSpace;
}
