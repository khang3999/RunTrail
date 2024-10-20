package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.exception.ErrorExceptionHandler;
import runtrail.dev.backend.repository.SpuRepository;
import runtrail.dev.backend.service.SpuService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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

    public List<SpuEntity> getRandomProductsByCategory(String category) {
        //Lay 20 sp giam gia nhat random
        List<SpuEntity> topDiscountedProducts = spuRepository.findTop20DiscountedProductsByCategory(category);
        List<SpuEntity> selectedProducts = new ArrayList<>();

        // Lấy 6 sp ngau nhien tu 20 sp giam gia
        if (topDiscountedProducts.size() > 6) {
            Random rand = new Random();
            while (selectedProducts.size() < 6) {
                //tao 1 so random tu 0 -> size -1
                int randomIndex = rand.nextInt(topDiscountedProducts.size());
                SpuEntity randomProduct = topDiscountedProducts.get(randomIndex);
                if (!selectedProducts.contains(randomProduct)) {
                    selectedProducts.add(randomProduct);
                }
            }
            //Neu duoi 6
        } else {
            selectedProducts.addAll(topDiscountedProducts);
        }

        // neu kh du 6sp, lay all sp con thieu
        if (selectedProducts.size() < 6) {
            //So sp thieu
            int remainingCount = 6 - selectedProducts.size();
            List<SpuEntity> randomProducts = spuRepository.findRandomProducts(remainingCount);
            selectedProducts.addAll(randomProducts);
        }
        return selectedProducts;
    }
}
