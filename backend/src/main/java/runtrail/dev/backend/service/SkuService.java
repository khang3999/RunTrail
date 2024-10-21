package runtrail.dev.backend.service;

import runtrail.dev.backend.entity.SkuEntity;
import runtrail.dev.backend.entity.SpuEntity;

import java.util.List;
import java.util.Optional;

public interface SkuService {
    List<SkuEntity> getAllSkus();
    Optional<SkuEntity> getSkuById(long id);
    List<SkuEntity> getSkusByCategoryOrParent(Long categoryId);

    default List<SkuEntity> filterSkus(Long brandId, Long minPrice, Long maxPrice) {
        return null;
    }

}
