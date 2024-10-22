package runtrail.dev.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.services.SpuService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api/v1/spu")
public class SpuController {

    Logger logger = LoggerFactory.getLogger(SpuController.class);

    @Autowired
    private SpuService spuService;



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
        Pageable pageable = PageRequest.of(page,size,sortBy);
        Page<SpuEntity> listSpu = spuService.findAllSpu(pageable);
        return new Response<>(listSpu,HttpStatus.OK.value(), "list ok");
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
        Pageable pageable = PageRequest.of(page -1,size,sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByFilter(minPrice,maxPrice,brandIds,categoryId, key, value, pageable);
        return new Response<>(listSpu,HttpStatus.OK.value(), "list ok");
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
        Pageable pageable = PageRequest.of(page-1,size,sortBy);
        final Page<SpuEntity> products = spuService.filterProductV2(minPrice, maxPrice, brandIds, categoryId, keys, values,pageable);
        return new Response<>(products,HttpStatus.OK.value(), "list ok");
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
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page -1,size,sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByQuickFilter(minPrice,maxPrice,brandIds,categoryId,key, value, contentOrderBy,pageable);
        return new Response<>(listSpu,HttpStatus.OK.value(), "list ok");
    }
    /*---------------END PAGINATION--------------*/


    // detail spu
    @GetMapping()
    public Response<?> findSpuById(
            @RequestParam(defaultValue = "") Long id
    ) {
        return new Response<>(spuService.findProductById(id),HttpStatus.OK.value(),"Fetch detail product ok");
    }

}