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

    // Lấy tất cả các SKU
    @GetMapping
    public ResponseEntity<List<SkuEntity>> getAllSkus() {
        List<SkuEntity> skus = skuService.getAllSkus();
        return new ResponseEntity<>(skus, HttpStatus.OK);
    }

    // Lấy SKU theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SkuEntity> getSkuById(@PathVariable long id) {
        Optional<SkuEntity> sku = skuService.getSkuById(id);
        return sku.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

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
