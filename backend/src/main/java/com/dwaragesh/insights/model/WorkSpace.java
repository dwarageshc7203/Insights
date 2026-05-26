package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class WorkSpace {

    @Id
    private int wid;
    private String wName;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private User uid;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<User> collaborators;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<Canvas> canvasList;
}
