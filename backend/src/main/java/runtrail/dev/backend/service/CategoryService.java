package runtrail.dev.backend.service;

import org.springframework.stereotype.Service;
import runtrail.dev.backend.entity.CategoryEntity;

import java.util.List;

public interface CategoryService {
     List<CategoryEntity> getAllCategories();
}
