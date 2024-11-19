package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.SkuImagesEntity;
import runtrail.dev.backend.repositories.SkuImagesRepository;
import runtrail.dev.backend.services.SkuImagesService;

import java.util.List;
import java.util.Optional;

@Service
public class SkuImagesServiceImpl implements SkuImagesService {

    @Autowired
    private SkuImagesRepository skuImagesRepository;

    @Override
    public List<SkuImagesEntity> getAllSkuImages() {
        return skuImagesRepository.findAll();
    }

    @Override
    public Optional<SkuImagesEntity> getSkuImageById(long id) {
        return skuImagesRepository.findById(id);
    }

   
}
