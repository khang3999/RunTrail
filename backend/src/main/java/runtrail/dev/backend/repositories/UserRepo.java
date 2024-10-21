package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import runtrail.dev.backend.entities.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
}
