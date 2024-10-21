package runtrail.dev.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;

import java.util.List;

public interface SpuService {
    Page<SpuEntity> findAllSpu(Pageable pageable);
    Page<SpuDTO> getSpuByQuickFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, String contentOrderBy, Pageable pageable);
    Page<SpuDTO> getSpuByFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, Pageable pageable);
    Page<SpuEntity> filterProductV2(Long minPrice, Long maxPrice, List<Long> brandIds,Long categoryId,List<String> keys,List<List<String>> values,Pageable pageable);
    SpuEntity findSpuById(long id);
}
