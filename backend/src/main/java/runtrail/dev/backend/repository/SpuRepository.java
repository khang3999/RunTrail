package runtrail.dev.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    // find Spu filter and  contain price, thumb
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus)  FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id WHERE sk.skuPrice >= ?1 AND sk.skuPrice <= ?2 AND CASE WHEN ?3 IS NOT NULL THEN u.brandId IN (?3) ELSE 1=1 END AND CASE WHEN ?4 IS NOT NULL THEN u.categoryId = ?4 ELSE 1=1 END GROUP BY u.id")

    Page<SpuDTO> findBySpuFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, Pageable pageable);
}
