package runtrail.dev.backend.dto.response;
 
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpuDTO {
    private Long id;

    private String spuName;

    private String spuDescription;

    private Long categoryId;

    private Long brandId;

    private String brandName;

    private Long spuPrice;

    private String spuThumbnail;

    private Integer spuStatus;

    private Integer discount;

    private String skuAttri;

}
