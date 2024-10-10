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
        // Fetch the category to check the parentId
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Long parentId = category.getParentId();

        // If parentId is -1, fetch SKUs for the category and its subcategories
        if (parentId == -1) {
            return skuRepository.findSkusByCategoryOrParent(categoryId);
        } else {
            // Otherwise, fetch SKUs only for the specified category
            return skuRepository.findSkusByCategoryOrParent(categoryId);
        }
    }


}
