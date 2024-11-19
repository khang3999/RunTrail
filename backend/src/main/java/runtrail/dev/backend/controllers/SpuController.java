package runtrail.dev.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.request.SkuPriceStockReqDTO;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.services.SkuService;
import runtrail.dev.backend.services.SpuService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api/v1/spu")
public class SpuController {

    Logger logger = LoggerFactory.getLogger(SpuController.class);

    @Autowired
    private SpuService spuService;

    @Autowired
    private SkuService skuService;


    // Lấy SPU theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SpuEntity> getSpuById(@PathVariable long id) {
        Optional<SpuEntity> spu = spuService.getSpuById(id);
        return spu.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /*---------------PAGINATION------------------*/
    @GetMapping("/all")
    public Response<?> getAllSpu(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction

    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        Page<SpuEntity> listSpu = spuService.findAllSpu(pageable);
        return new Response<>(listSpu, HttpStatus.OK.value(), "list ok");
    }

    @GetMapping("/filter")
    public Response<?> getSpuByFilter(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") long minPrice,
            @RequestParam(defaultValue = "200000") long maxPrice,
            @RequestParam(defaultValue = "") List<Long> brandIds,
            @RequestParam(defaultValue = "-1") Long categoryId,
            @RequestParam(defaultValue = "") String key,
            @RequestParam(defaultValue = "") List<String> value,
            @RequestParam(defaultValue = "") List<List<String>> listValue,
            @RequestParam(defaultValue = "") List<String> listKey
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page - 1, size, sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByFilter(minPrice, maxPrice, brandIds, categoryId, key, value, pageable);
        return new Response<>(listSpu, HttpStatus.OK.value(), "list ok");
    }

    @GetMapping("/filterV2")
    public Response<?> getSpuByFilterV2(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") long minPrice,
            @RequestParam(defaultValue = "200000") long maxPrice,
            @RequestParam(defaultValue = "") List<Long> brandIds,
            @RequestParam(defaultValue = "-1") Long categoryId,
            @RequestParam(defaultValue = "") List<String> keys,
            @RequestParam(defaultValue = "") List<List<String>> values
    ) {

        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page - 1, size, sortBy);
        final Page<SpuEntity> products = spuService.filterProductV2(minPrice, maxPrice, brandIds, categoryId, keys, values, pageable);
        return new Response<>(products, HttpStatus.OK.value(), "list ok");
    }

    @GetMapping("/filter1")
    public Response<?> getSpuByQuickFilter(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") long minPrice,
            @RequestParam(defaultValue = "2000000") long maxPrice,
            @RequestParam(defaultValue = "") List<Long> brandIds,
            @RequestParam(defaultValue = "-1") Long categoryId,
            @RequestParam(defaultValue = "desc") String contentOrderBy,
            @RequestParam(defaultValue = "") String key,
            @RequestParam(defaultValue = "") List<String> value
    ) {
        logger.info("category" + categoryId + "");
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page - 1, size, sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByQuickFilter(minPrice, maxPrice, brandIds, categoryId, key, value, contentOrderBy, pageable);
        return new Response<>(listSpu, HttpStatus.OK.value(), "list ok");
    }
    /*---------------END PAGINATION--------------*/


    // Cac san pham random
    @GetMapping("/random")
    public Response<List<SpuDTO>> getRandomProducts(@RequestParam long category, @RequestParam int number) {
        return new Response<>(spuService.getRelatedProduct(category, number), HttpStatus.OK.value(), "radom ok");
    }

    //Test 20sp
    @GetMapping("/top20sp")
    public Response<List<SpuDTO>> get20spTop(@RequestParam long category) {
        return new Response<>(spuService.get20spTop(category), HttpStatus.OK.value(), " ok");
    }


    // detail spu
    @GetMapping()
    public Response<?> findSpuBySlug(
            @RequestParam(defaultValue = "") String slug
    ) {
        return new Response<>(spuService.findProductBySlugV2(slug), HttpStatus.OK.value(), "Fetch detail product ok");
    }

    // test
    @PostMapping("/stock-price")
    public Response<?> findStockAndPrice(
            @RequestBody SkuPriceStockReqDTO body
    ) {
        return new Response<>(skuService.findPriceAndStockProduct(body.getSpuId(), body.getAttributes()), HttpStatus.OK.value(), "Fetch detail product ok");
    }

    @GetMapping("/sizes-by-categoryId-price-brandIds")
    public Response<List<String>> findDistinctSizesByCategoryId(@RequestParam Long categoryId, @RequestParam(defaultValue = "") String brandIds, @RequestParam(defaultValue = "0") long minPrice,
                                                                @RequestParam(defaultValue = "2000000") long maxPrice) {
        return new Response<>(spuService.getDistinctSizesByCategoryId(categoryId, brandIds,minPrice,maxPrice), HttpStatus.OK.value(), "Distinct sizes");
    }
    //Search
    @GetMapping("/search")
    public Response<List<SpuDTO>> search(@RequestParam String key) {
        return new Response<>(spuService.getProductsByKey(key), HttpStatus.OK.value(), " ok");
    }

    // get all slug
    @GetMapping("/all-slug")
    public Response<List<String>> getAllSlug() {
        return new Response<>(spuService.getAllSlug(), HttpStatus.OK.value(), " ok");
    }
}