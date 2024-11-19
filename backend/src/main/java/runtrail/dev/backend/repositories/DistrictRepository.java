package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.entities.DistrictEntity;

import java.util.List;

public interface DistrictRepository extends JpaRepository<DistrictEntity, Long> {
    @Query("SELECT d FROM DistrictEntity d WHERE d.provinceCode = :provinceCode")
    List<DistrictEntity> getDistrictOfProvince(@Param("provinceCode") String provinceCode);
}
