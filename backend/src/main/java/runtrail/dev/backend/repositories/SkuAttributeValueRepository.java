package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.SkuAttributeValueEntity;

import java.util.List;

@Repository
public interface SkuAttributeValueRepository extends JpaRepository<SkuAttributeValueEntity, Long> {
    List<SkuAttributeValueEntity> findByAttriId(long attriId); 
}
