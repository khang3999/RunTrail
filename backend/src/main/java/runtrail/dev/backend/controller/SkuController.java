package runtrail.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.entity.SkuEntity;
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

    // Lấy SKU theo ID
    @GetMapping("/bySpu/{spuId}")
    public ResponseEntity<List<SkuEntity>> getSkusBySpuId(@PathVariable long spuId) {
        List<SkuEntity> skus = skuService.getSkusBySpuId(spuId);
        if (skus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skus, HttpStatus.OK);
    }


    // Lọc sản phẩm theo giá
    @GetMapping("/filter")
    public List<SkuEntity> filterSkus(
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false, defaultValue = "0") Long minPrice,
            @RequestParam(required = false, defaultValue = "20000000") Long maxPrice) {

        System.out.println("Brand IDs: " + brandId);
        System.out.println("Min Price: " + minPrice);
        System.out.println("Max Price: " + maxPrice);
        return skuService.filterSkus(brandId, minPrice, maxPrice);
    }
}
