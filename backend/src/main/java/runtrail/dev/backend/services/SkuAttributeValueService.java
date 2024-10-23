package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.SkuAttributeValueEntity;

import java.util.List;
import java.util.Optional;

public interface SkuAttributeValueService {
    List<SkuAttributeValueEntity> getAllSkuAttributeValues();
    Optional<SkuAttributeValueEntity> getSkuAttributeValueById(long id);
}
