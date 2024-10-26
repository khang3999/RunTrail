package runtrail.dev.backend.repositories;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SkuPriceStockDTO;
import java.util.Map;

@Repository
public interface SkuRepoCustom {
    SkuPriceStockDTO findStockAndPriceProductBySpuId(long spuId, Map<String, String> mapAttributes);
}
