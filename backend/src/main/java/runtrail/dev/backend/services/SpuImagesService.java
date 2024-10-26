package runtrail.dev.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import runtrail.dev.backend.entities.SpuImagesEntity;
import runtrail.dev.backend.repositories.SpuImagesRepository;

import java.util.List;
import java.util.Optional;

public interface SpuImagesService {
    List<SpuImagesEntity> getAllSpuImages();
    Optional<SpuImagesEntity> getSpuImageById(long id);




}
