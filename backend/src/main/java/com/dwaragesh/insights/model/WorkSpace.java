package com.dwaragesh.insights.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    private List<User> collaborators;
}
