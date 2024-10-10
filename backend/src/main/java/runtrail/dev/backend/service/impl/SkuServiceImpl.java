package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entity.CategoryEntity;
import runtrail.dev.backend.entity.SkuEntity;
import runtrail.dev.backend.repository.CategoryRepository;
import runtrail.dev.backend.repository.SkuRepository;
import runtrail.dev.backend.service.SkuService;

import java.util.List;
import java.util.Optional;

@Service
public class SkuServiceImpl implements SkuService {

    @Autowired
    private SkuRepository skuRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<SkuEntity> getAllSkus() {
        return skuRepository.findAll();
    }

    @Override
    public Optional<SkuEntity> getSkuById(long id) {
        return skuRepository.findById(id);
    }

    @Override
    public List<SkuEntity> getSkusByCategoryOrParent(Long categoryId) {
        // Step 1: Fetch all relevant category IDs (parent and subcategories)
        List<Long> categoryIds = skuRepository.findCategoryAndSubcategories(categoryId);

        // Step 2: Fetch all SKUs based on those category IDs
        return skuRepository.findSkusByCategoryIds(categoryIds);
    }


     @Override
     public List<SkuEntity> getSkusByPriceRange(Long minPrice, Long maxPrice) {
        return skuRepository.findBySkuPriceBetween(minPrice, maxPrice);
     }
}
