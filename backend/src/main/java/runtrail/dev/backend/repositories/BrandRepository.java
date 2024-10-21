package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.BrandEntity;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
}