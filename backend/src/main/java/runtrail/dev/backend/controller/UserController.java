package runtrail.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.model.User;
import runtrail.dev.backend.repository.UserRepo;

import java.util.List;

@RestController()
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserRepo userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/test-db")
    public String testDatabaseConnection() {
        User user = new User();
        user.setName("Test User");
        user.setEmail("test@example.com");
        userRepository.save(user);

        long count = userRepository.count();
        return "Database connected! User count: " + count;
    }
}
