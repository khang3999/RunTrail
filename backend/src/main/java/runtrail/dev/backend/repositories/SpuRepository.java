 package runtrail.dev.backend.repositories;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    // find Spu filter and  contain price, thumb chien
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri")
    Page<SpuDTO> findBySpuFilter(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY min(sk.skuPrice*(100-u.discount)) DESC")
    Page<SpuDTO> findBySpuFilterDESCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY min(sk.skuPrice*(100-u.discount)) ASC")
    Page<SpuDTO> findBySpuFilterASCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount, sk.skuAttri) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id WHERE (sk.skuPrice >= :minPrice) AND (sk.skuPrice <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId) ELSE (1=1) END AND CASE WHEN (:key IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName, sk.skuAttri ORDER BY u.discount DESC")
    Page<SpuDTO> findBySpuFilterSALE(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    // filter V2
    Page<SpuEntity> findAll(Specification<SpuEntity> specification, Pageable pageable);


    @Query("SELECT DISTINCT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.id, br.brandName, sk.skuPrice, img.imgUrl, u.spuStatus, u.discount, sk.skuAttri) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.id = u.id " +
            "WHERE u.categoryId = :category " +
            "ORDER BY u.discount DESC")
    List<SpuDTO> findTopDiscountedSpuByCategory(@Param("category") long category, Pageable pageable);

    @Query("SELECT DISTINCT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.id, br.brandName, sk.skuPrice, img.imgUrl, u.spuStatus, u.discount, sk.skuAttri) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.id = u.id " +
            "ORDER BY RAND()")
    List<SpuDTO> findRandomProducts(Pageable pageable);
}
