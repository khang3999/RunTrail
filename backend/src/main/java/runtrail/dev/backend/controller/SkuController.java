package runtrail.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.service.SkuService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/sku")
public class SkuController {

    @Autowired
    private SkuService skuService;


    // This method handles both getting all SKUs and getting SKUs by category
    @GetMapping
    public ResponseEntity<List<SkuEntity>> getAllSkus(
            @RequestParam(value = "categoryId", required = false) Long categoryId) {

        List<SkuEntity> skus;

        if (categoryId != null) {
            // Fetch SKUs by category
            skus = skuService.getSkusByCategoryOrParent(categoryId);
        } else {
            // Fetch all SKUs
            skus = skuService.getAllSkus();
        }

        return ResponseEntity.ok(skus);
    }

    // Lấy SKU theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SkuEntity> getSkuById(@PathVariable long id) {
        Optional<SkuEntity> sku = skuService.getSkuById(id);
        return sku.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
