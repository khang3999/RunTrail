package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.entities.BannerEntity;
import runtrail.dev.backend.entities.BrandEntity;
import runtrail.dev.backend.services.BannerService;
import runtrail.dev.backend.services.BrandService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/banners")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    // Lấy tất cả các thương hiệu
    @GetMapping
    public Response<List<BannerEntity>> getAllBanners() {
        List<BannerEntity> banners = bannerService.getAllBanners();
        return new Response<>(banners, HttpStatus.OK.value(), "Get brands by statusId successfully");

    }


}
