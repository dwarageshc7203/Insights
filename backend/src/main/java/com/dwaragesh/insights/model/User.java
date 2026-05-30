package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.aot.generate.GeneratedTypeReference;

import java.time.Instant;
import java.util.List;

@Data
@Entity(name = "appUser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    private String userName;
    private String email;
    private String password;
    @CreationTimestamp
    private Instant createdAt;
    @OneToMany(mappedBy = "owner")
//    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<WorkSpace> workSpaces;

}
