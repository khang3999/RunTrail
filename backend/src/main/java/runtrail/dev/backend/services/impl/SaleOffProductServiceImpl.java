package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.NewSpuEntity;
import runtrail.dev.backend.entities.SpuImagesEntity;
import runtrail.dev.backend.repositories.NewSpuRepository;
import runtrail.dev.backend.repositories.SaleOffRepository;
import runtrail.dev.backend.repositories.SpuImagesRepository;
import runtrail.dev.backend.services.NewSpuService;
import runtrail.dev.backend.services.SaleOffProductService;

import java.util.List;

@Service
public class SaleOffProductServiceImpl implements SaleOffProductService {

    private final SaleOffRepository saleOffRepository;
    @Autowired
    private SpuImagesRepository spuImagesRepository;

    public SaleOffProductServiceImpl(SaleOffRepository saleOffRepository) {
        this.saleOffRepository = saleOffRepository;
    }

    @Override
    public List<SpuDTO> getListSaleOffProduct() {
        List<SpuDTO> listNewSpu  = saleOffRepository.getSaleOffProduct();
        listNewSpu.forEach(product -> {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
            product.setImages(images);
        });

        return listNewSpu;
    }


}
