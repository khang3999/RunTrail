package runtrail.dev.backend.repositories;

import runtrail.dev.backend.dto.response.SpuDTO;

import java.util.List;

public interface SpuRepoCustom {
    SpuDTO findProductBySlug(String slug);

    List<String> findAllSlug();
}
