package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.BrandEntity;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    List<BrandEntity> getAllBrands();
    Optional<BrandEntity> getBrandById(long id);
    List<BrandEntity> getBrandsByCategoryId(long categoryId);
}
