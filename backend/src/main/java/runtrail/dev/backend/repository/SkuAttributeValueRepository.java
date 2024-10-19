package runtrail.dev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entity.SkuAttributeValueEntity;

import java.util.List;

@Repository
public interface SkuAttributeValueRepository extends JpaRepository<SkuAttributeValueEntity, Long> {
    List<SkuAttributeValueEntity> findByAttriId(long attriId);

    @Query("SELECT sav From SkuAttributeValueEntity sav WHERE sav.categoryId = :categoryId")
    List<SkuAttributeValueEntity> findSkuAttributeValueEntitiesByCategoryId(@Param("categoryId") Long categoryId);

}
