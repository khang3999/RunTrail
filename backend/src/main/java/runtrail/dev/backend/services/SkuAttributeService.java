package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.SkuAttributeEntity;

import java.util.List;
import java.util.Optional;

public interface SkuAttributeService {
    List<SkuAttributeEntity> getAllSkuAttributes();
    Optional<SkuAttributeEntity> getSkuAttributeById(long id);
}
