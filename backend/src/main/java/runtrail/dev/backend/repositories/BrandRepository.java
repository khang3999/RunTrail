package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.BrandEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    @Query("SELECT b FROM BrandEntity b  JOIN SpuEntity s ON b.id = s.brand.id JOIN CategoryEntity c ON s.categoryId = c.id  WHERE (:categoryId IS NULL OR s.categoryId = :categoryId OR c.parentId = :categoryId)")
    List<BrandEntity> findBrandEntitiesByCategoryId(@RequestParam Long categoryId);
}