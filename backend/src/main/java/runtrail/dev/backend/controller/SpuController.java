package runtrail.dev.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.service.SpuService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api/v1/spu")
public class SpuController {

    Logger logger = LoggerFactory.getLogger(SpuController.class);

    @Autowired
    private SpuService spuService;


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
            @RequestParam(defaultValue = "") List<String> value

    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page -1,size,sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByFilter(minPrice,maxPrice,brandIds,categoryId, key, value, pageable);
        return new Response<>(listSpu,HttpStatus.OK.value(), "list ok");
    }

    @GetMapping("/filter1")
    public Response<?> getSpuByQuickFilter(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") long minPrice,
            @RequestParam(defaultValue = "200000") long maxPrice,
            @RequestParam(defaultValue = "") List<Long> brandIds,
            @RequestParam(defaultValue = "-1") Long categoryId,
            @RequestParam(defaultValue = "desc") String contentOrderBy,
            @RequestParam(defaultValue = "") String key,
            @RequestParam(defaultValue = "") List<String> value
    ) {
        logger.info("category"+categoryId+"");
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page -1,size,sortBy);
        Page<SpuDTO> listSpu = spuService.getSpuByQuickFilter(minPrice,maxPrice,brandIds,categoryId,key, value, contentOrderBy,pageable);
        return new Response<>(listSpu,HttpStatus.OK.value(), "list ok");
    }
    /*---------------END PAGINATION--------------*/


}