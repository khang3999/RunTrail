package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import runtrail.dev.backend.entity.BrandEntity;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    @Query("SELECT b FROM BrandEntity b  JOIN SpuEntity s ON b.id = s.brandId JOIN CategoryEntity c ON s.categoryId = c.id  WHERE (:categoryId IS NULL OR s.categoryId = :categoryId OR c.parentId = :categoryId)")
    List<BrandEntity> findBrandEntitiesByCategoryId(@RequestParam Long categoryId);
}