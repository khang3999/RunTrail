package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.SkuAttributeValueEntity;

import java.util.List;

@Repository
public interface SkuAttributeValueRepository extends JpaRepository<SkuAttributeValueEntity, Long> {
    List<SkuAttributeValueEntity> findByAttriId(long attriId);

    @Query("SELECT DISTINCT sav FROM SkuAttributeValueEntity sav INNER JOIN SkuAttributeEntity sa ON sa.id = sav.attriId INNER JOIN CategoryEntity c ON c.id = sa.categoryId WHERE (c.id = :categoryId OR c.parentId = :categoryId)")
    List<SkuAttributeValueEntity> findSkuAttributeValueEntitiesByCategoryId(@Param("categoryId") Long categoryId);

}
