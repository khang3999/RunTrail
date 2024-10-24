package runtrail.dev.backend.repositories;

import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SkuPriceStockDTO;
import runtrail.dev.backend.entities.SkuEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public interface SkuRepoCustom {
    SkuPriceStockDTO findStockAndPriceProductBySpuId(long spuId, Map<String, String> mapAttributes);
}
