package runtrail.dev.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.session.DefaultCookieSerializerCustomizer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.exception.ErrorExceptionHandler;
import runtrail.dev.backend.services.CartService;

import java.util.HashMap;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {


}
