package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.CollectionDTO;
import runtrail.dev.backend.entities.*;
import runtrail.dev.backend.repositories.CollectionRepository;
import runtrail.dev.backend.services.CollectionService;

import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {
   @Autowired
   private CollectionRepository collectionRepository;

   @Override
   public CollectionEntity getCollectionById(long id) {
      return collectionRepository.getCollectionWithProducts(id);
   }

   @Override
   public List<SpuEntity> getProductListOfCollection(long id) {
      return collectionRepository.getProductListOfCollection(id);
   }

   @Override
   public List<CollectionEntity> getOrderedCollectionProducts() {
      return collectionRepository.getOrderedCollectionProducts();
   }
}
