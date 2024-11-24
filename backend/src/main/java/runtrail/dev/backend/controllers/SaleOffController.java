package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.services.NewSpuService;
import runtrail.dev.backend.services.SaleOffProductService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sale-off")
public class SaleOffController {

    @Autowired
    private SaleOffProductService saleOffProductService;

    @GetMapping("/all")
    public Response<List<SpuDTO>> getAll () {
        return new Response<>(saleOffProductService.getListSaleOffProduct(), HttpStatus.OK.value(), " ok");
    }

}
