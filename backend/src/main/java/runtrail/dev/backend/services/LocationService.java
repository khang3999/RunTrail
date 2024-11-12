package runtrail.dev.backend.services;

import runtrail.dev.backend.entities.DistrictEntity;
import runtrail.dev.backend.entities.ProvinceEntity;
import runtrail.dev.backend.entities.WardEntity;

import java.util.List;

public interface LocationService {
    List<ProvinceEntity> getAllProvinces();
    List<DistrictEntity> getDistrictOfProvince(String provinceCode);
    List<WardEntity> getWardOfDistrict(String districtCode);
}
