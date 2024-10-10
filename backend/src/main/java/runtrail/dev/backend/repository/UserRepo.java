package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import runtrail.dev.backend.entity.UserEntity;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
}
