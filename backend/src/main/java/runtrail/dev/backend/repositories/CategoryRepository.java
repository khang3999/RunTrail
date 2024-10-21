package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import runtrail.dev.backend.entities.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
