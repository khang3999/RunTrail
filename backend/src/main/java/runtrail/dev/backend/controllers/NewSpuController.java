package runtrail.dev.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/new-sku")
public class NewSpuController {
    @GetMapping("/all")
    public Response<List<SpuDTO>> getAll (@RequestParam long category) {
        return new Response<>(spuService.get20spTop(category), HttpStatus.OK.value(), " ok");
    }

}
