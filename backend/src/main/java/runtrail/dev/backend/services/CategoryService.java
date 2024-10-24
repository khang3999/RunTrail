package runtrail.dev.backend.services;

import runtrail.dev.backend.dto.response.CategoryDTO;
import runtrail.dev.backend.entities.CategoryEntity;

import java.util.List;

public interface CategoryService {
     List<CategoryEntity> getAllCategories();
     CategoryDTO getCategoryByIdWithParent(Long categoryId);

}
