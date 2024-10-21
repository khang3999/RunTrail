package runtrail.dev.backend.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.exception.ErrorExceptionHandler;
import runtrail.dev.backend.repositories.SpuRepository;
import runtrail.dev.backend.repositories.specification.SpuSpecification;
import runtrail.dev.backend.service.SpuService;

import java.util.List;
import java.util.Optional;

@Service
public class SpuServiceImpl implements SpuService {

    @Autowired
    private SpuRepository spuRepository;
    @Override
    public Page<SpuEntity> findAllSpu(Pageable pageable) {
        return spuRepository.findAll(pageable);
    }


    public Page<SpuDTO> getSpuByFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, Pageable pageable) {
        brandIds = brandIds.isEmpty() ? null : brandIds;
        categoryId = categoryId == -1 ? null : categoryId;
        key = key.isEmpty() ? null : key;
        value = value.isEmpty() ? null : value;

        return spuRepository.findBySpuFilter(minPrice,maxPrice, brandIds, categoryId, key, value, pageable);
    }

    @Override
    public Page<SpuEntity> filterProductV2(Long minPrice, Long maxPrice, List<Long> brandIds, Long categoryId, List<String> keys, List<List<String>> values,Pageable pageable) {
        final Specification<SpuEntity>specification = SpuSpecification.filterProduct(minPrice, maxPrice, brandIds, categoryId, keys, values);
        return spuRepository.findAll(specification,pageable);
    }

    @Override
    public SpuEntity findSpuById(long id) {
        final SpuEntity spu = spuRepository.findById(id);
        if (spu == null) {
            throw new ErrorExceptionHandler("Not found spu", HttpStatus.NOT_FOUND.value());
        }
        return spu;
    }


    @Override
    public Page<SpuDTO> getSpuByQuickFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, String contentOrderBy, Pageable pageable) {
        brandIds = brandIds.isEmpty() ? null : brandIds;
        categoryId = categoryId == -1 ? null : categoryId;
        key = key.isEmpty() ? null : key;
        value = value.isEmpty() ? null : value;
          if (contentOrderBy.equals("asc")) {
            return spuRepository.findBySpuFilterASCNew(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
         }
         else if(contentOrderBy.equals("desc")) {
             return spuRepository.findBySpuFilterDESCNew(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
         } else {
              return spuRepository.findBySpuFilterSALE(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
          }
    }
}
