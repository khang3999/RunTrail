package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.entities.WardEntity;

import java.util.List;

public interface WardRepository extends JpaRepository<WardEntity, Long> {
    @Query("SELECT w FROM WardEntity w WHERE w.districtCode = :districtCode")
    List<WardEntity> getWardOfDistrict(@Param("districtCode") String districtCode);
}

