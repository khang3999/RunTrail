package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entity.SkuEntity;
import runtrail.dev.backend.repository.SkuRepository;
import runtrail.dev.backend.service.SkuService;

import java.util.List;
import java.util.Optional;

@Service
public class SkuServiceImpl implements SkuService {

    @Autowired
    private SkuRepository skuRepository;


    @Override
    public List<SkuEntity> getAllSkus() {
        return skuRepository.findAll();
    }

    @Override
    public Optional<SkuEntity> getSkuById(long id) {
        return skuRepository.findById(id);
    }

    @Override
    public List<SkuEntity> getSkusByCategoryId(long categoryId) {
        return skuRepository.findSkuEntitiesByCategoryId(categoryId);
    }


}
