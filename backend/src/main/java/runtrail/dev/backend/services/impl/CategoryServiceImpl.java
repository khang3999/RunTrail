package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.CategoryEntity;
import runtrail.dev.backend.repositories.CategoryRepository;
import runtrail.dev.backend.services.CategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<CategoryEntity> getCategoryByIdWithParent(Long categoryId) {
        List<CategoryEntity> categories = new ArrayList<>();
        Optional<CategoryEntity> categoryOpt = categoryRepository.findById(categoryId);

        while (categoryOpt.isPresent()) {
            CategoryEntity category = categoryOpt.get();
            categories.add(category);
            if (category.getParentId() != null) {
                categoryOpt = categoryRepository.findById(category.getParentId());
            } else {
                break; // Stop if there's no parentId
            }
        }
        return categories;
    }
}
