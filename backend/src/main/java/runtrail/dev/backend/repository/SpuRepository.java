package runtrail.dev.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    // find Spu filter and  contain price, thumb chien 
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brandId IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri")
    Page<SpuDTO> findBySpuFilter(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brandId IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END  GROUP BY u.id, br.brandName, sk.skuAttri")
    Page<SpuDTO> findBySpuFilterV2(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brandId IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY min(sk.skuPrice*(100-u.discount)) DESC")
    Page<SpuDTO> findBySpuFilterDESCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brandId IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY min(sk.skuPrice*(100-u.discount)) ASC")
    Page<SpuDTO> findBySpuFilterASCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brandId = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brandId IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY u.discount DESC")
    Page<SpuDTO> findBySpuFilterSALE(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query(value = "SELECT * FROM spu p WHERE p.category_id = :category ORDER BY p.discount DESC LIMIT 20", nativeQuery = true)
    //Lay 20 san pham lien quan
    List<SpuEntity> findTop20DiscountedProductsByCategory(String category);
    //Lay random all sp
    @Query(value = "SELECT * FROM spu ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<SpuEntity> findRandomProducts(int limit);

}
