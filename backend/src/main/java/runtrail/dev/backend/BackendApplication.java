package runtrail.dev.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import runtrail.dev.backend.configs.WebConfig;

@SpringBootApplication
@EnableCaching
public class BackendApplication {
    // use cors to allow frontend to access backend from WebConfig.java
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
