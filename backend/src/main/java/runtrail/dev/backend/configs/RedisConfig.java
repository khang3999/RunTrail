package runtrail.dev.backend.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import runtrail.dev.backend.dto.response.SpuDTO;

@Configuration
public class RedisConfig {
    @Bean
    JedisConnectionFactory jedisConnectionFactory() {
        JedisConnectionFactory jedisConFactory = new JedisConnectionFactory();
        // get from env
        jedisConFactory.setHostName("redis-17406.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com");
        jedisConFactory.setPort(17406);
        jedisConFactory.setPassword("2xRV5iXSq735NCAxfxHBb1ytVKopVJYh");
        jedisConFactory.setClientName("default");
        return jedisConFactory;
    }

    @Bean
    public RedisTemplate<String, ?> redisTemplate() {
        RedisTemplate<String, ?> template = new RedisTemplate<>();


        template.setConnectionFactory(jedisConnectionFactory());

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }


}