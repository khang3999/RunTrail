package runtrail.dev.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import runtrail.dev.backend.dto.response.Response;

@RestController
@RequestMapping("/api/v1")
public class AppController {

    @GetMapping("/working")
    public Response<?> working() {
        return new Response<>("It's working!!!", HttpStatus.OK.value(), "OK");
    }
}
