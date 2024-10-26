package runtrail.dev.backend.services;


import runtrail.dev.backend.dto.response.SkuPriceStockDTO;
import runtrail.dev.backend.entities.SkuEntity;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface SkuService {
    List<SkuEntity> getAllSkus();
    Optional<SkuEntity> getSkuById(long id);
    List<SkuEntity> getSkusByCategoryOrParent(Long categoryId);

    List<SkuEntity> findAllSkuActiveBySpuId(Long spuId);

    default List<SkuEntity> filterSkus(Long brandId, Long minPrice, Long maxPrice) {
        return null;
    }

    SkuPriceStockDTO findPriceAndStockProduct(Long id,Object attributes);
}
