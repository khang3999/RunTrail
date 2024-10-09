package runtrail.dev.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entity.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);
}
