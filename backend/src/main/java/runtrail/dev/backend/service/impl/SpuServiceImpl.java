package runtrail.dev.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.repository.SpuRepository;
import runtrail.dev.backend.service.SpuService;

import java.util.List;
import java.util.Optional;

@Service
public class SpuServiceImpl implements SpuService {

    @Autowired
    private SpuRepository spuRepository;

    @Override
    public List<SpuEntity> getAllSpus() {
        return spuRepository.findAll();
    }

    @Override
    public Optional<SpuEntity> getSpuById(long id) {
        return spuRepository.findById(id);
    }

   
}
