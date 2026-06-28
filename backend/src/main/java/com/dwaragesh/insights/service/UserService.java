package com.dwaragesh.insights.service;

import com.dwaragesh.insights.dto.User.UserRequest;
import com.dwaragesh.insights.dto.User.UserResponse;
import com.dwaragesh.insights.model.User;
import com.dwaragesh.insights.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    /**
     * Synchronize a user record.
     * <p>
     *   - If the user exists and the provided fields match, return the existing record without a DB write.
     *   - If the user exists but fields differ, update the mutable fields and persist.
     *   - If the user does not exist, create a new entity.
     * </p>
     */
    public UserResponse syncUser(UserRequest request) {
        // Try to find an existing user
        Optional<User> maybeUser = repository.findUserByUserId(request.userId());
        if (maybeUser.isPresent()) {
            User existing = maybeUser.get();
            // No changes needed?
            if (Objects.equals(existing.getUserName(), request.userName()) &&
                Objects.equals(existing.getEmail(), request.email())) {
                return new UserResponse(
                        existing.getUserId(),
                        existing.getUserName(),
                        existing.getEmail(),
                        existing.getCreatedAt()
                );
            }
            // Update mutable fields
            existing.setUserName(request.userName());
            existing.setEmail(request.email());
            User saved = repository.save(existing);
            return new UserResponse(
                    saved.getUserId(),
                    saved.getUserName(),
                    saved.getEmail(),
                    saved.getCreatedAt()
            );
        }
        // Create new user
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
}
