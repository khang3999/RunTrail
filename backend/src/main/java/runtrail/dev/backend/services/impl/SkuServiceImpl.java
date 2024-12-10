package runtrail.dev.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.controllers.SpuController;
import runtrail.dev.backend.dto.response.SkuPriceStockDTO;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.repositories.CategoryRepository;
import runtrail.dev.backend.repositories.SkuRepoCustom;
import runtrail.dev.backend.repositories.SkuRepository;
import runtrail.dev.backend.repositories.specification.SkuSpecification;
import runtrail.dev.backend.services.SkuService;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SkuServiceImpl implements SkuService {

    private static final int TIME_REDIS = 24*60*60;

    @Autowired
    private SkuRepository skuRepository;

    @Autowired
    private SkuRepoCustom skuRepoCustom;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<SkuEntity> getAllSkus() {
        return skuRepository.findAll();
    }

    @Override
    public Optional<SkuEntity> getSkuById(long id) {
        return skuRepository.findById(id);
    }

    @Override
    public List<SkuEntity> getSkusByCategoryOrParent(Long categoryId) {
        return null;
    }

    @Override
    public List<SkuEntity> findAllSkuActiveBySpuId(Long spuId) {
        return skuRepository.findAllBySpuId(spuId);
    }

    @Override
    public SkuPriceStockDTO findPriceAndStockProduct(Long id,Object attributes) {
        String key = "sku_" + id;
        if (id <= 0) {
            // set cache null
            redisTemplate.opsForValue().set(key, null);
            return null;
        }

        // found in cache redis
        Object dataCache = redisTemplate.opsForValue().get(key);

        // found in cache redis
        if (dataCache != null){
            ObjectMapper mapper = new ObjectMapper();
            try {
                return mapper.readValue(dataCache.toString(), SkuPriceStockDTO.class);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // found in database
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,String> mapAttributes = objectMapper.convertValue(attributes,Map.class);
        SkuPriceStockDTO skuPriceStockDTO = skuRepoCustom.findStockAndPriceProductBySpuId(id,mapAttributes);
        try{
            String json = objectMapper.writeValueAsString(skuPriceStockDTO);
            redisTemplate.opsForValue().set(key, json);
            redisTemplate.expire(key, TIME_REDIS, java.util.concurrent.TimeUnit.SECONDS);

        }catch (Exception e){
            e.printStackTrace();
        }
        // save to cache
        return skuPriceStockDTO;
    }

}
