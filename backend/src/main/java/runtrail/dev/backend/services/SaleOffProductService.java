package runtrail.dev.backend.services;

import runtrail.dev.backend.dto.response.SpuDTO;

import java.util.List;

public interface SaleOffProductService {
    List<SpuDTO> getListSaleOffProduct();
}
