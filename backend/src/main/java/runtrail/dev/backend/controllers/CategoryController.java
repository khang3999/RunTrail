package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import runtrail.dev.backend.dto.response.CategoryDTO;
import runtrail.dev.backend.entities.CategoryEntity;
import runtrail.dev.backend.services.CategoryService;
import runtrail.dev.backend.services.SkuService;

import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SkuService skuService;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        List<CategoryEntity> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

     @GetMapping("/{cateId}")
    public ResponseEntity<CategoryDTO> getCategoryWithParent(@PathVariable Long cateId) {
        CategoryDTO categories = categoryService.getCategoryByIdWithParent(cateId);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


}
