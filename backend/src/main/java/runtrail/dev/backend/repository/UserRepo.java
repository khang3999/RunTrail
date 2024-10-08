package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import runtrail.dev.backend.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
