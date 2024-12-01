package runtrail.dev.backend.services;
import runtrail.dev.backend.dto.response.CollectionDTO;
import runtrail.dev.backend.dto.response.CollectionProductDTO;
import runtrail.dev.backend.entities.*;

import java.util.List;
import java.util.Objects;

public interface CollectionService {
    CollectionEntity getCollectionById(long id);
    List<SpuEntity> getProductListOfCollection(long id);
    List<CollectionEntity> getOrderedCollectionProducts();
}
