package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.entities.BrandEntity;
import runtrail.dev.backend.services.BrandService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    // Lấy tất cả các thương hiệu
    @GetMapping
    public ResponseEntity<List<BrandEntity>> getAllBrands() {
        List<BrandEntity> brands = brandService.getAllBrands();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    // Lấy thương hiệu theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BrandEntity> getBrandById(@PathVariable long id) {
        Optional<BrandEntity> brand = brandService.getBrandById(id);
        return brand.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/by-category")
    public Response<?> getBrandsByCategory(@RequestParam Long categoryId) {
        List<BrandEntity> brandEntities = brandService.getBrandsByCategoryId(categoryId);
        return new Response<>(brandEntities, HttpStatus.OK.value(), "Get brands by category successfully");
    }

    @GetMapping("/by-status")
    public Response<?> getBrandsByStatus(@RequestParam int statusId) {
        List<BrandEntity> brandEntities = brandService.getBrandsByStatusId(statusId);
        return new Response<>(brandEntities, HttpStatus.OK.value(), "Get brands by statusId successfully");
    }
}
