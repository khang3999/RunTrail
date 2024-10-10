package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entity.SkuEntity;

import java.util.List;

@Repository
public interface SkuRepository extends JpaRepository<SkuEntity, Long> {
    List<SkuEntity> findBySkuName(String skuName);
    // Truy vấn để tìm các sản phẩm có giá nằm trong khoảng giá trị
    List<SkuEntity> findBySkuPriceBetween(Long minPrice, Long maxPrice);
}
