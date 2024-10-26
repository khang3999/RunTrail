package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.entities.SpuImagesEntity;

import java.util.List;

@Repository
public interface SpuImagesRepository extends JpaRepository<SpuImagesEntity, Long> {

    //lay anh the id cua spu
    List<SpuImagesEntity> findBySpuId(long spuId);


}
