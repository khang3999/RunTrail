package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.SpuImagesEntity;

import java.util.List;

@Repository
public interface SpuImagesRepository extends JpaRepository<SpuImagesEntity, Long> {
    List<SpuImagesEntity> findBySpuId(long spuId); 
}
