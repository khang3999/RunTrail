package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.repositories.SpuRepository;
import runtrail.dev.backend.repositories.specification.SpuSpecification;
import runtrail.dev.backend.services.SkuService;
import runtrail.dev.backend.services.SpuService;

import java.util.*;
import java.util.List;

@Service
public class SpuServiceImpl implements SpuService {

    @Autowired
    private SpuRepository spuRepository;

    @Autowired
    private SkuService skuService;

    @Override
    public List<SpuEntity> getAllSpus() {
        return List.of();
    }

    @Override
    public Optional<SpuEntity> getSpuById(long id) {
        return Optional.empty();
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
    public Page<SpuEntity> filterProductV2(Long minPrice, Long maxPrice, List<Long> brandIds, Long categoryId, List<String> keys, List<List<String>> values,Pageable pageable) {
        final Specification<SpuEntity>specification = SpuSpecification.filterProduct(minPrice, maxPrice, brandIds, categoryId, keys, values);
        return spuRepository.findAll(specification,pageable);
    }

    @Override
    public SpuEntity findProductById(Long id) {
        //
       return spuRepository.findById(id).orElse(null);
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
