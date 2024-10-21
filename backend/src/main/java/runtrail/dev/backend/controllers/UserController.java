package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.entities.UserEntity;
import runtrail.dev.backend.repositories.UserRepo;

import java.util.List;

@RestController()
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserRepo userRepository;

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/test-db")
    public String testDatabaseConnection() {
        UserEntity user = new UserEntity();
        user.setName("Test User");
        user.setEmail("test@example.com");
        userRepository.save(user);

        long count = userRepository.count();
        return "Database connected! User count: " + count;
    }
}
