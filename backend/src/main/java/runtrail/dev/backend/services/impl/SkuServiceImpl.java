package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.repositories.CategoryRepository;
import runtrail.dev.backend.repositories.SkuRepository;
import runtrail.dev.backend.services.SkuService;

import java.util.List;
import java.util.Optional;

@Service
public class SkuServiceImpl implements SkuService {

    @Autowired
    private SkuRepository skuRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<SkuEntity> getAllSkus() {
        return skuRepository.findAll();
    }

    @Override
    public Optional<SkuEntity> getSkuById(long id) {
        return skuRepository.findById(id);
    }

    @Override
    public List<SkuEntity> getSkusByCategoryOrParent(Long categoryId) {
        return List.of();
    }


}
