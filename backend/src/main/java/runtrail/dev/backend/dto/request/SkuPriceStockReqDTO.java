package runtrail.dev.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SkuPriceStockReqDTO {
    private long spuId;
    private Object attributes;
}
