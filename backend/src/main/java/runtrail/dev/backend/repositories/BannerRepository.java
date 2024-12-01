package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import runtrail.dev.backend.entities.BannerEntity;
import runtrail.dev.backend.entities.BrandEntity;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<BannerEntity, Long> {

    @Query("SELECT b FROM BannerEntity b  WHERE b.status = :statusId")
    List<BannerEntity> findBannerEntitiesByStatusId(@RequestParam int statusId);
}