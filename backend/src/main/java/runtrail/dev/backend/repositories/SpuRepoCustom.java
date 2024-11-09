package runtrail.dev.backend.repositories;

import runtrail.dev.backend.dto.response.SpuDTO;

public interface SpuRepoCustom {
    SpuDTO findProductBySlug(String slug);
}
