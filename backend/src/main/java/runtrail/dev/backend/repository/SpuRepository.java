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
    @Query("SELECT  new runtrail.dev.backend.dto.response.SpuDTO(u.id,u.spuName,u.spuDescription,u.categoryId,u.brandId,min(sk.skuPrice),'images',u.spuStatus) FROM SpuEntity u inner join SkuEntity sk on sk.spu.id = u.id where sk.skuPrice >= ?1 and sk.skuPrice <= ?2 and case when(?3 is not null) then (u.brandId in (?3)) else (1 = 1) end  GROUP BY (u.id)")
    Page<SpuDTO> findBySpuFilter(long minPrice,long maxPrice,List<Long> brandIds,Pageable pageable);
}
