package runtrail.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.service.SpuService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/spus")
public class SpuController {

    @Autowired
    private SpuService spuService;

    // Lấy tất cả các SPU
    @GetMapping
    public ResponseEntity<List<SpuEntity>> getAllSpus() {
        List<SpuEntity> spus = spuService.getAllSpus();
        return new ResponseEntity<>(spus, HttpStatus.OK);
    }

    // Lấy SPU theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SpuEntity> getSpuById(@PathVariable long id) {
        Optional<SpuEntity> spu = spuService.getSpuById(id);
        return spu.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
