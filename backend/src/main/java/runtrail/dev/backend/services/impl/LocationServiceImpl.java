package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.DistrictEntity;
import runtrail.dev.backend.entities.ProvinceEntity;
import runtrail.dev.backend.entities.WardEntity;
import runtrail.dev.backend.repositories.DistrictRepository;
import runtrail.dev.backend.repositories.ProvinceRepository;
import runtrail.dev.backend.repositories.WardRepository;
import runtrail.dev.backend.services.LocationService;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private WardRepository wardRepository;

    @Override
    public List<ProvinceEntity> getAllProvinces() {
        return provinceRepository.getAllProvinces();
    }

    @Override
    public List<DistrictEntity> getDistrictOfProvince(String provinceCode) {
        return districtRepository.getDistrictOfProvince(provinceCode);
    }

    @Override
    public List<WardEntity> getWardOfDistrict(String districtCode) {
        return wardRepository.getWardOfDistrict(districtCode);
    }
}
