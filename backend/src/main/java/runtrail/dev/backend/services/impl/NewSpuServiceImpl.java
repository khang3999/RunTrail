package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.NewSpuEntity;
import runtrail.dev.backend.entities.SpuImagesEntity;
import runtrail.dev.backend.repositories.NewSpuRepository;
import runtrail.dev.backend.repositories.SpuImagesRepository;
import runtrail.dev.backend.services.NewSpuService;

import java.util.List;

@Service
public class NewSpuServiceImpl implements NewSpuService {

    private final NewSpuRepository newSpuRepository;
    @Autowired
    private SpuImagesRepository spuImagesRepository;

    public NewSpuServiceImpl(NewSpuRepository newSpuRepository) {
        this.newSpuRepository = newSpuRepository;
    }

    @Override
    public List<SpuDTO> getAllNewListSpus() {
        List<SpuDTO> listNewSpu  = newSpuRepository.getAllNewSpu();
        listNewSpu.forEach(product -> {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
            product.setImages(images);
        });

        return listNewSpu;
    }


}
