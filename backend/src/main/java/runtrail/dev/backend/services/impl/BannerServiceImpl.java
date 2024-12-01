package runtrail.dev.backend.services.impl;

import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.BannerEntity;
import runtrail.dev.backend.entities.BrandEntity;
import runtrail.dev.backend.repositories.BannerRepository;
import runtrail.dev.backend.services.BannerService;

import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {


    private final BannerRepository bannerRepository;

    public BannerServiceImpl(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    @Override
    public List<BannerEntity> getAllBanners() {
        return bannerRepository.findBannerEntitiesByStatusId(1);
    }
}
