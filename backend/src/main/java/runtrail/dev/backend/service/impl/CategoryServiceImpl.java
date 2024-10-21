package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.CategoryEntity;
import runtrail.dev.backend.repositories.CategoryRepository;
import runtrail.dev.backend.service.CategoryService;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

}
