package runtrail.dev.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;

import java.util.List;
import java.util.Optional;

public interface SpuService {
    List<SpuEntity> getAllSpus();
    Optional<SpuEntity> getSpuById(long id);

    Page<SpuEntity> findAllSpu(Pageable pageable);
    Page<SpuDTO> getSpuByQuickFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, String contentOrderBy, Pageable pageable);
    Page<SpuDTO> getSpuByFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, Pageable pageable);

    List<SpuDTO> getRelatedProduct(long category,int number);

    //demo top 20 sp
    List<SpuDTO> get20spTop(long category);

    Page<SpuEntity> filterProductV2(Long minPrice, Long maxPrice, List<Long> brandIds,Long categoryId,List<String> keys,List<List<String>> values,Pageable pageable);

    SpuEntity findProductBySlug(String slug);
    SpuDTO findProductBySlugV2(String slug);

     List<String> getDistinctSizesByCategoryId(Long categoryId,String brandIds,Long minPrice,Long maxPrice);

     List<SpuDTO> getProductsByKey (String key);


     List<String> getAllSlug();
}
