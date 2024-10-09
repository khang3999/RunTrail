package runtrail.dev.backend.service;

import runtrail.dev.backend.entity.SpuEntity;

import java.util.List;
import java.util.Optional;

public interface SpuService {
    List<SpuEntity> getAllSpus();
    Optional<SpuEntity> getSpuById(long id);
}
