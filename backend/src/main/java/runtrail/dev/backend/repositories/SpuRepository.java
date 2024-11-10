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

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount,u.slug) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice * (1 - u.discount / 100) >= :minPrice) AND (sk.skuPrice * (1 - u.discount / 100) <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:value IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 = 1) END GROUP BY u.id, br.brandName")
    Page<SpuDTO> findBySpuFilter(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, br.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount,u.slug) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice * (1 - u.discount / 100) >= :minPrice) AND (sk.skuPrice * (1 - u.discount / 100) <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:value IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName ORDER BY min(sk.skuPrice*(100-u.discount)) DESC")
    Page<SpuDTO> findBySpuFilterDESCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount,u.slug) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice * (1 - u.discount / 100) >= :minPrice) AND (sk.skuPrice * (1 - u.discount / 100) <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:value IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName ORDER BY min(sk.skuPrice*(100-u.discount)) ASC")
    Page<SpuDTO> findBySpuFilterASCNew(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'images', u.spuStatus, u.discount,u.slug) FROM SpuEntity u INNER JOIN SkuEntity sk ON sk.spu.id = u.id INNER JOIN BrandEntity br ON u.brand.id = br.id INNER JOIN CategoryEntity ca ON u.categoryId = ca.id WHERE (sk.skuPrice * (1 - u.discount / 100) >= :minPrice) AND (sk.skuPrice * (1 - u.discount / 100) <= :maxPrice) AND CASE WHEN :brandIds IS NOT NULL THEN (u.brand.id IN (:brandIds)) ELSE (1=1) END AND CASE WHEN :categoryId IS NOT NULL THEN (u.categoryId = :categoryId OR ca.parentId = :categoryId) ELSE (1=1) END AND CASE WHEN (:value IS NOT NULL) THEN (JSON_EXTRACT(sk.skuAttri,CONCAT('$.',:key)) IN (:value)) ELSE (1 =1) END GROUP BY u.id, br.brandName ORDER BY u.discount DESC")

    Page<SpuDTO> findBySpuFilterSALE(@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice, @Param("brandIds") List<Long> brandIds, @Param("categoryId") Long categoryId, @Param("key") String key, @Param("value") List<String> value, Pageable pageable);

    // filter V2
    Page<SpuEntity> findAll(Specification<SpuEntity> specification, Pageable pageable);


    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.id, br.brandName, min(sk.skuPrice), 'image', u.spuStatus, u.discount,u.slug) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.brand.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.spu.id = u.id " +
            "WHERE u.categoryId = :category " +
            "GROUP BY u.id ORDER BY u.discount DESC")
    List<SpuDTO> findTopDiscountedSpuByCategory(@Param("category") long category, Pageable pageable);

    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, min(sk.skuPrice), 'image', u.spuStatus, u.discount, u.slug) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.brand.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.spu.id = u.id " +
            "GROUP BY u.id, u.spuName, u.spuDescription, u.categoryId, u.brand.id, br.brandName, u.spuStatus, u.discount, u.slug " +
            "ORDER BY RAND()")
    List<SpuDTO> findRandomProducts(Pageable pageable);

    SpuEntity findBySlug(String slug);
    @Query(value = "SELECT DISTINCT JSON_UNQUOTE(JSON_EXTRACT(spu_attributes, '$.Size')) AS sizes" +
            " FROM spu " +
            " INNER JOIN categories ON spu.category_id = categories.id" +
            " INNER JOIN sku ON spu.id = sku.spu_id " +
            " WHERE (categories.id = :categoryId OR categories.parent_id = :categoryId OR :categoryId IS NULL)" +
            " AND (FIND_IN_SET(spu.brand_id, :brandIds) > 0 OR :brandIds IS NULL)" +
            " AND (sku.sku_price * (1 - spu.discount / 100) >= :minPrice)" +
            " AND (sku.sku_price * (1 - spu.discount / 100) <= :maxPrice)", nativeQuery = true)
    List<String> findDistinctSizesByCategoryId(@Param("categoryId") Long categoryId, @Param("brandIds") String brandIds,@Param("minPrice") long minPrice, @Param("maxPrice") long maxPrice);

    //Search
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.id, br.brandName, min(sk.skuPrice), 'image', u.spuStatus, u.discount, u.spuAttributes, u.slug) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "INNER JOIN BrandEntity br ON u.brand.id = br.id " +
            "INNER JOIN SpuImagesEntity img ON img.spu.id = u.id " +
            "WHERE u.spuName LIKE %:keyword% " +
            "GROUP BY u.id")
    List<SpuDTO> findSpuByKeyword(@Param("keyword") String keyword);



}
