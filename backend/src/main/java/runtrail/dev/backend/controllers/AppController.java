package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.services.RedisService;

@RestController
@RequestMapping("/api/v1")
public class AppController {

    @Autowired
    private RedisService redisService;


    @GetMapping("/working")
    public Response<?> working() {
        return new Response<>("Server is working ok prod!!!", HttpStatus.OK.value(), "OK");
    }

    // delete all cache in redis
    @GetMapping("/clear-cache")
    public Response<?> clearCache() {
        // clear all cache in redis
        redisService.clearCache();
        return new Response<>("Cache cleared", HttpStatus.OK.value(), "OK");
    }
}
