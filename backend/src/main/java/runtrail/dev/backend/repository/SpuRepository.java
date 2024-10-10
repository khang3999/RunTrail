package runtrail.dev.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    // find Spu filter and  contain price, thumb
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id,u.spuName,u.spuDescription,u.categoryId,u.brandId,(select min(s.skuPrice) from SkuEntity s where s.spu.id = u.id ),si.imgUrl,u.spuStatus,u.discount)  FROM SpuEntity u inner join SpuImagesEntity si on u.id = si.spuId")
    Page<SpuDTO> findBySpuFilter(Pageable pageable);
}
