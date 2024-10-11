package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import runtrail.dev.backend.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
