package runtrail.dev.backend.service;

import runtrail.dev.backend.entities.CategoryEntity;

import java.util.List;

public interface CategoryService {
     List<CategoryEntity> getAllCategories();
}
