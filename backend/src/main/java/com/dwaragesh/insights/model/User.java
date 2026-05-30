package com.dwaragesh.insights.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.aot.generate.GeneratedTypeReference;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Entity(name = "appUser")
public class User {
    @Id
    private UUID userId;
    private String userName;
    private String email;
    @CreationTimestamp
    private Instant createdAt;
    @OneToMany(mappedBy = "owner")
//    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<WorkSpace> workSpaces;

}
