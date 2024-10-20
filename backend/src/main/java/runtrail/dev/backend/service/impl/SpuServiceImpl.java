package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.repository.SpuRepository;
import runtrail.dev.backend.service.SpuService;

import java.util.*;

@Service
public class SpuServiceImpl implements SpuService {

    @Autowired
    private SpuRepository spuRepository;

    @Override
    public List<SpuEntity> getAllSpus() {
        return spuRepository.findAll();
    }

    @Override
    public Optional<SpuEntity> getSpuById(long id) {
        return spuRepository.findById(id);
    }

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

    public List<SpuDTO> getRandomProductsByCategory(long category ) {
        // Lấy 20 sp có mã giảm giá cao nhất
        Pageable pageable = PageRequest.of(0, 20);
        List<SpuDTO> topDiscountedProducts = spuRepository.findTopDiscountedSpuByCategory(category,pageable);
        List<SpuDTO> selectedProducts = new ArrayList<>();

        // lấy 6 random từ 20sp
        if (!topDiscountedProducts.isEmpty()) {
            //Trộn all sp từ 20 sp
            Collections.shuffle(topDiscountedProducts);

            selectedProducts.addAll(topDiscountedProducts.subList(0, Math.min(6, topDiscountedProducts.size())));
        }

        // lấy random all sp
        int remainingCount = 6 - selectedProducts.size();
        if (remainingCount > 0) {
            List<SpuDTO> randomProducts = spuRepository.findRandomProducts(Pageable.ofSize(remainingCount));
            selectedProducts.addAll(randomProducts);
        }

        return selectedProducts;
    }

    //Test20sp
    public List<SpuDTO> get20spTop(long category ) {
        // Lấy 20 sp có mã giảm giá cao nhất
        Pageable pageable = PageRequest.of(0, 20);
        List<SpuDTO> topDiscountedProducts = spuRepository.findTopDiscountedSpuByCategory(category, pageable);
        List<SpuDTO> selectedProducts = new ArrayList<>();

        selectedProducts.addAll(topDiscountedProducts);

        return selectedProducts;
    }

}
