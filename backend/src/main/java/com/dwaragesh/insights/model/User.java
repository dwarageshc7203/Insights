package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    private int userId;

    private String userName;
    private String email;

    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<WorkSpace> workSpaces;

}
