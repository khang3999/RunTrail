package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.entities.DistrictEntity;
import runtrail.dev.backend.entities.ProvinceEntity;
import runtrail.dev.backend.entities.WardEntity;
import runtrail.dev.backend.services.LocationService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/provinces")
    public Response<List<ProvinceEntity>> getAllProvinces() {
        List<ProvinceEntity> provinces = locationService.getAllProvinces();

        if (provinces != null) {
            return new Response<>(provinces, HttpStatus.OK.value(), "Get provinces successfully");
        } else {
            return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Provinces not found");
        }
    }

    @GetMapping("/provinces/district/{code}")
    public Response<List<DistrictEntity>> getDistrictOfProvince(@PathVariable String code) {
        List<DistrictEntity> districts = locationService.getDistrictOfProvince(code);

        if (districts != null) {
            return new Response<>(districts, HttpStatus.OK.value(), "Get district successfully");
        } else {
            return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "District not found");
        }
    }

    @GetMapping("/provinces/district/ward/{code}")
    public Response<List<WardEntity>> getWardOfDistrict(@PathVariable String code) {
        List<WardEntity> wards = locationService.getWardOfDistrict(code);

        if (wards != null) {
            return new Response<>(wards, HttpStatus.OK.value(), "Get wards successfully");
        } else {
            return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Wards not found");
        }
    }
}
