package runtrail.dev.backend.services;

import org.springframework.stereotype.Service;

@Service
public interface RedisService {
    void clearCache();
}
