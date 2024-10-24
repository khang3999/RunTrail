package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.SkuImagesEntity;

import java.util.List;
import java.util.Optional;

public interface SkuImagesService {
    List<SkuImagesEntity> getAllSkuImages();
    Optional<SkuImagesEntity> getSkuImageById(long id);
}
