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
import runtrail.dev.backend.repositories.SpuRepository;
import runtrail.dev.backend.services.NewSpuService;

import java.util.ArrayList;
import java.util.List;

@Service
public class NewSpuServiceImpl implements NewSpuService {

    private final NewSpuRepository newSpuRepository;
    private final SpuImagesRepository spuImagesRepository;

    // Constructor-based injection
    @Autowired
    public NewSpuServiceImpl(NewSpuRepository newSpuRepository, SpuImagesRepository spuImagesRepository) {
        this.newSpuRepository = newSpuRepository;
        this.spuImagesRepository = spuImagesRepository;
    }

    @Override
    public List<SpuDTO> getAllNewListSpus() {
        List<SpuDTO> listNewSpu = newSpuRepository.getAllNewSpuWithDetails();
        for (SpuDTO spuDTO : listNewSpu) {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(spuDTO.getId());
            spuDTO.setImages(images);
        }
        return listNewSpu;
    }
}




