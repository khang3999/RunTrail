package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.services.NewSpuService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/new-spu")
public class NewSpuController {

    @Autowired
    private NewSpuService newSpuService;

    @GetMapping("/all")
    public Response<List<SpuDTO>> getAll () {
        return new Response<>(newSpuService.getAllNewListSpus(), HttpStatus.OK.value(), " ok");
    }

}
