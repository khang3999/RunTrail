package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.NewSpuEntity;
import runtrail.dev.backend.entities.SaleOffEntity;

import java.util.List;

public interface SaleOffRepository extends JpaRepository<SaleOffEntity, Long> {

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.idSpu, u.spu.spuName, u.spu.spuDescription, u.spu.categoryId, u.spu.brand.id, br.brandName, min(sk.skuPrice), 'image', u.spu.spuStatus, u.spu.discount, u.spu.slug) " +
            "FROM SaleOffEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.idSpu " +
            "INNER JOIN BrandEntity br ON u.spu.brand.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.spu.id = u.idSpu " +
            "GROUP BY u.idSpu, u.spu.spuName, u.spu.spuDescription, u.spu.categoryId, u.spu.brand.id, br.brandName, u.spu.spuStatus, u.spu.discount, u.spu.slug")
    List<SpuDTO> getSaleOffProductWithDetails();


}
