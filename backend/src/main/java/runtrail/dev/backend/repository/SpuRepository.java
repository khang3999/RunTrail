package runtrail.dev.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;

public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, MIN(sk.skuPrice), 'images', u.spuStatus) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "WHERE sk.skuPrice >= ?1 AND sk.skuPrice <= ?2 " +
            "AND (?3 IS NULL OR u.brandId IN ?3) " +
            "GROUP BY u.id " +
            "ORDER BY min(sk.skuPrice) DESC"
    )
    Page<SpuDTO> findBySpuFilter(long minPrice, long maxPrice, List<Long> brandIds, Pageable pageable);

}
