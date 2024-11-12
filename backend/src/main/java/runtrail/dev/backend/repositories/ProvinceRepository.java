package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import runtrail.dev.backend.entities.ProvinceEntity;

import java.util.List;

public interface ProvinceRepository extends JpaRepository<ProvinceEntity, Long> {
    @Query("SELECT p FROM ProvinceEntity p")
    List<ProvinceEntity> getAllProvinces();
}
