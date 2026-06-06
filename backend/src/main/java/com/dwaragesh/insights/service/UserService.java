package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.User.UserRequest;
import com.dwaragesh.insights.dto.User.UserResponse;
import com.dwaragesh.insights.model.User;
import com.dwaragesh.insights.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponse syncUser(UserRequest request) {
        return repository.findUserByUserId(request.userId())
                .map(existingUser -> new UserResponse(
                        existingUser.getUserId(),
                        existingUser.getUserName(),
                        existingUser.getEmail(),
                        existingUser.getCreatedAt()
                ))
                .orElseGet(() -> {
                    try {
                        User newUser = new User();
                        newUser.setUserId(request.userId());
                        newUser.setUserName(request.userName());
                        newUser.setEmail(request.email());

                        User saved = repository.save(newUser);
                        return new UserResponse(
                                saved.getUserId(),
                                saved.getUserName(),
                                saved.getEmail(),
                                saved.getCreatedAt()
                        );
                    }
                    catch(Exception e) {
                        return repository.findUserByUserId(request.userId())
                                .map(u -> new UserResponse(
                                        u.getUserId(),
                                        u.getUserName(),
                                        u.getEmail(),
                                        u.getCreatedAt()
                                ))
                                .orElseThrow(() -> new RuntimeException("User sync failed"));
                    }
                });
    }
}
