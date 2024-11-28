package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.dto.response.CollectionDTO;
import runtrail.dev.backend.dto.response.CollectionProductDTO;
import runtrail.dev.backend.entities.CollectionEntity;
import runtrail.dev.backend.entities.CollectionProductEntity;
import runtrail.dev.backend.entities.SpuEntity;

import java.util.List;

public interface CollectionRepository extends JpaRepository<CollectionEntity, Long> {
   @Query("SELECT c FROM CollectionEntity c " +
           "LEFT JOIN FETCH c.products cp " +
           "LEFT JOIN FETCH cp.spu spu " +
           "WHERE c.id = :collectionId")
   CollectionEntity getCollectionWithProducts(@Param("collectionId") long collectionId);

   @Query("SELECT spu FROM CollectionEntity c " +
           "JOIN c.products cp " +
           "JOIN cp.spu spu " +
           "WHERE c.id = :collectionId")
   List<SpuEntity> getProductListOfCollection(@Param("collectionId") long collectionId);

   @Query("SELECT c FROM CollectionEntity c " +
           "JOIN c.products cp " +
           "JOIN cp.spu spu " +
           "ORDER BY c.numericalOrder")
   List<CollectionEntity> getOrderedCollectionProducts();
}
