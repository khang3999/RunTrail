package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.SkuAttributeEntity;
import runtrail.dev.backend.repositories.SkuAttributeRepository;
import runtrail.dev.backend.services.SkuAttributeService;

import java.util.List;
import java.util.Optional;

@Service
public class SkuAttributeServiceImpl implements SkuAttributeService {

    @Autowired
    private SkuAttributeRepository skuAttributeRepository;

    @Override
    public List<SkuAttributeEntity> getAllSkuAttributes() {
        return skuAttributeRepository.findAll();
    }

    @Override
    public Optional<SkuAttributeEntity> getSkuAttributeById(long id) {
        return skuAttributeRepository.findById(id);
    }

   
}
