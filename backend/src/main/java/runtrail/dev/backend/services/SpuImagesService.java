package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.SpuImagesEntity;

import java.util.List;
import java.util.Optional;

public interface SpuImagesService {
    List<SpuImagesEntity> getAllSpuImages();
    Optional<SpuImagesEntity> getSpuImageById(long id);
}
