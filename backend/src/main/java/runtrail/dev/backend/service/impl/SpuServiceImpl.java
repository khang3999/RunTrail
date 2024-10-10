package runtrail.dev.backend.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.controller.SpuController;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;
import runtrail.dev.backend.repository.SpuRepository;
import runtrail.dev.backend.repository.SpuRepositoryASC;
import runtrail.dev.backend.service.SpuService;

import java.util.List;
import java.util.Optional;

@Service
public class SpuServiceImpl implements SpuService {

    @Autowired
    private SpuRepository spuRepository;
    @Autowired
    private SpuRepositoryASC spuRepositoryASC;

    @Override
    public List<SpuEntity> getAllSpus() {
        return spuRepository.findAll();
    }
    @Override
    public List<SpuEntity> getAllSpusASC() {
        return spuRepositoryASC.findAll();
    }

    @Override
    public Optional<SpuEntity> getSpuById(long id) {
        return spuRepository.findById(id);
    }
    @Override
    public Optional<SpuEntity> getSpuByIdASC(long id) {
        return spuRepositoryASC.findById(id);
    }

    @Override
    public Page<SpuEntity> findAllSpu(Pageable pageable) {
        return spuRepository.findAll(pageable);
    }
    @Override
    public Page<SpuEntity> findAllSpuASC(Pageable pageable) {
        return spuRepositoryASC.findAll(pageable);
    }

    @Override
    public Page<SpuDTO> getSpuByFilter(long minPrice,long maxPrice,List<Long> brandIds,String contentOrderBy ,Pageable pageable) {
        brandIds = brandIds.isEmpty() ? null : brandIds;
        Logger logger = LoggerFactory.getLogger(SpuController.class);
        if (contentOrderBy.equals("asc")) {
            return spuRepositoryASC.findBySpuFilterASC(minPrice, maxPrice, brandIds, pageable);
        }
        else {
            return spuRepository.findBySpuFilter(minPrice, maxPrice, brandIds, pageable);

        }
    }
}
