package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.NewSpuEntity;

import java.util.List;

public interface NewSpuRepository extends JpaRepository<NewSpuEntity, Long> {

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'image', u.spuStatus, u.discount, u.slug) " +
            "FROM NewSpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.brand.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.spu.id = u.id " +
            "GROUP BY u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, u.spuStatus, u.discount, u.slug")
    List<SpuDTO> getAllNewSpu();

}