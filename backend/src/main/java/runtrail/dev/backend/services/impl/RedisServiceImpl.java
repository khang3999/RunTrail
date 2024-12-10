package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.services.RedisService;

import java.util.Objects;

@Service
public class RedisServiceImpl implements RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Override
    public void clearCache() {
        // TODO Auto-generated method stub
        // clear all cache in redis
       redisTemplate.getConnectionFactory().getConnection().serverCommands().flushAll();
    }
}
