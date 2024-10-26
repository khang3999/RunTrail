package runtrail.dev.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class SkuPriceStockDTO implements Serializable {
    private Long totalStock;
    private String skuPrice;
    private String list;
}
