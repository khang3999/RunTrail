package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entity.SkuEntity;

import java.util.List;

@Repository
public interface SkuRepository extends JpaRepository<SkuEntity, Long> {
    List<SkuEntity> findBySkuName(String skuName);

    // Tìm các SKU theo danh sách spuId và trong khoảng giá
    @Query("SELECT s FROM SkuEntity s JOIN s.spu sp " +
            "WHERE (:brandId IS NULL OR sp.brandId = :brandId) " +
            "AND s.skuPrice BETWEEN :minPrice AND :maxPrice")
    List<SkuEntity> findByBrandAndPrice(Long brandId, Long minPrice, Long maxPrice);



}
