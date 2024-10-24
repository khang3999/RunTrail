package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.CategoryDTO;
import runtrail.dev.backend.entities.CategoryEntity;
import runtrail.dev.backend.repositories.CategoryRepository;
import runtrail.dev.backend.services.CategoryService;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryDTO getCategoryByIdWithParent(Long categoryId) {
        Optional<CategoryEntity> categoryOpt = categoryRepository.findById(categoryId);
        
        if (categoryOpt.isPresent()) {
            CategoryEntity category = categoryOpt.get();
            return buildCategoryDTOWithParent(category); // Convert to DTO and build parent structure
        }
        
        return null;
    }

    private CategoryDTO buildCategoryDTOWithParent(CategoryEntity category) {
        // If the category has a parent, fetch and build the parent DTO recursively
        CategoryDTO parentDTO = null;
        if (category.getParentId() != null) {
            Optional<CategoryEntity> parentOpt = categoryRepository.findById(category.getParentId());
            if (parentOpt.isPresent()) {
                parentDTO = buildCategoryDTOWithParent(parentOpt.get());
            }
        }

        // Return the current category as a DTO, including the parent DTO (if any)
        return new CategoryDTO(category.getId(), category.getName(), parentDTO);
    }
}
