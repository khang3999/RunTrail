package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.SkuEntity;

import java.util.List;

@Repository
public interface SkuRepository extends JpaRepository<SkuEntity, Long> {
    List<SkuEntity> findBySkuName(String skuName);


    // Fetch category and its subcategories
    @Query("SELECT c.id FROM CategoryEntity c WHERE c.id = :categoryId OR c.parentId = :categoryId")
    List<Long> findCategoryAndSubcategories(@Param("categoryId") Long categoryId);

    // Fetch SKUs by category IDs (from first query)
    @Query("SELECT s FROM SkuEntity s WHERE s.spu.categoryId IN :categoryIds")
    List<SkuEntity> findSkusByCategoryIds(@Param("categoryIds") List<Long> categoryIds);



    // Tìm các SKU theo danh sách spuId và trong khoảng giá
    @Query("SELECT s FROM SkuEntity s JOIN s.spu sp " +
            "WHERE (:brandId IS NULL OR sp.brandId = :brandId) " +
            "AND s.skuPrice BETWEEN :minPrice AND :maxPrice")
    List<SkuEntity> findByBrandAndPrice(Long brandId, Long minPrice, Long maxPrice);


}
