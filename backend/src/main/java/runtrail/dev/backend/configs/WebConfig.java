package runtrail.dev.backend.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://my-runtrail-frontend.s3-website-ap-southeast-1.amazonaws.com","http://localhost:3000","http://d3uhwavn3f6u71.cloudfront.net")
                .allowedMethods("GET", "POST", "PUT", "DELETE").allowCredentials(true).allowedHeaders("*");
    }
}
