package runtrail.dev.backend.services;

import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.BannerEntity;
import runtrail.dev.backend.entities.BrandEntity;

import java.util.List;
import java.util.Optional;

@Service
public interface BannerService {
    List<BannerEntity> getAllBanners();

}
