package runtrail.dev.backend.dto.response;
 
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.entities.SpuImagesEntity;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
public class SpuDTO {
    private Long id;

    private String spuName;

    private String spuDescription;

    private Long categoryId;

    private String spuNo;

    private Long brandId;

    private String brandName;

    private Long spuPrice;

    private String spuThumbnail;

    private Integer spuStatus;

    private Integer discount;

    private List<SpuImagesEntity> images;

    private List<SkuEntity> listSku;

    private String spuAttributes;

    private String slug;

    public SpuDTO(Long id, String spuName, List<SpuImagesEntity> images,List<SkuEntity> listSku) {
        this.id = id;
        this.spuName = spuName;
        this.images = images;
        this.listSku = listSku;
    }

    public SpuDTO(Long id, String spuName, List<SpuImagesEntity> images) {
        this.id = id;
        this.spuName = spuName;
        this.images = images;
    }

    public SpuDTO(Long id,String spuNo, String spuName, String spuDescription,List<SpuImagesEntity> images, Long categoryId, String brandName, Integer spuStatus, Integer discount,String slug,String spuAttributes) {
        this.id = id;
        this.spuNo = spuNo;
        this.spuName = spuName;
        this.spuDescription = spuDescription;
        this.categoryId = categoryId;
        this.brandName = brandName;
        this.spuStatus = spuStatus;
        this.discount = discount;
        this.slug = slug;
        this.images = images;
        this.spuAttributes = spuAttributes;
    }


    public SpuDTO(Long id, String spuName, String spuDescription, Long categoryId, Long brandId, String brandName, Long spuPrice, String spuThumbnail, Integer spuStatus, Integer discount,String slug) {
        this.id = id;
        this.spuName = spuName;
        this.spuDescription = spuDescription;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.brandName = brandName;
        this.spuPrice = spuPrice;
        this.spuThumbnail = spuThumbnail;
        this.spuStatus = spuStatus;
        this.discount = discount;
//        this.spuAttributes = spuAttributes;
        this.slug = slug;
    }


}
