package runtrail.dev.backend.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.entities.SpuImagesEntity;
import runtrail.dev.backend.exception.ErrorExceptionHandler;
import runtrail.dev.backend.repositories.SpuImagesRepository;
import runtrail.dev.backend.repositories.SpuRepoCustom;
import runtrail.dev.backend.repositories.SpuRepository;
import runtrail.dev.backend.repositories.specification.SpuSpecification;
import runtrail.dev.backend.services.SkuService;
import runtrail.dev.backend.services.SpuService;

import java.util.*;
import java.util.List;

@Service
public class SpuServiceImpl implements SpuService {

    private static final Log LOG = LogFactory.getLog(SpuServiceImpl.class);

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SpuRepository spuRepository;

    @Autowired
    private SpuRepoCustom spuRepoCustom;

    @Autowired
    private SkuService skuService;

    @Autowired
    private SpuImagesRepository spuImagesRepository;

    @Override
    public List<SpuEntity> getAllSpus() {
        return null;
    }

    @Override
    public Optional<SpuEntity> getSpuById(long id) {
        return Optional.empty();
    }

    @Override
    public Page<SpuEntity> findAllSpu(Pageable pageable) {
        return spuRepository.findAll(pageable);
    }



    public Page<SpuDTO> getSpuByFilter(long minPrice,long maxPrice,List<Long> brandIds, Long categoryId, String key, List<String> value, Pageable pageable) {
        brandIds = brandIds.isEmpty() ? null : brandIds;
        categoryId = categoryId == -1 ? null : categoryId;
        key = key.isEmpty() ? null : key;
        value = value.isEmpty() ? null : value;

        return spuRepository.findBySpuFilter(minPrice,maxPrice, brandIds, categoryId, key, value, pageable);
    }

    @Override
    public Page<SpuEntity> filterProductV2(Long minPrice, Long maxPrice, List<Long> brandIds, Long categoryId, List<String> keys, List<List<String>> values,Pageable pageable) {
        final Specification<SpuEntity>specification = SpuSpecification.filterProduct(minPrice, maxPrice, brandIds, categoryId, keys, values);
        return spuRepository.findAll(specification,pageable);
    }

    @Override
    public SpuEntity findProductBySlug(String slug) {
        //
       final SpuEntity spu = spuRepository.findBySlug(slug);
       if (spu == null) {
           throw new ErrorExceptionHandler("Product not found", HttpStatus.NOT_FOUND.value());
       }
       return spu;
    }

    @Override
    public SpuDTO findProductBySlugV2(String slug) {

        // check if the product is already in the cache
        Object dataCache = redisTemplate.opsForValue().get(slug);

        SpuDTO product = null;

        if (dataCache == null) {
            LOG.info("Product not found in cache.");
            // get from db
            product = spuRepoCustom.findProductBySlug(slug);
            if (product == null) {
                LOG.info("Product not found");
                // set cache key with null value
                redisTemplate.opsForValue().set(slug, null);
                throw new ErrorExceptionHandler("Product not found", HttpStatus.NOT_FOUND.value());
            }
            // save to redis
            // convert product to json
            ObjectMapper mapper = new ObjectMapper();
            String productJson = null;
            try {
                productJson = mapper.writeValueAsString(product);
                redisTemplate.opsForValue().set(slug, productJson);
                LOG.info("Product saved to cache.");
                // set time expire
                redisTemplate.expire(slug, 1200, java.util.concurrent.TimeUnit.SECONDS);
            } catch (Exception e) {
                LOG.error("Error when save product to cache");
                e.printStackTrace();
            }

        }
        else{
            // have cache =>
            LOG.info("Product found in cache.");
            // convert json to product
            ObjectMapper mapper = new ObjectMapper();
            try {
                product = mapper.readValue(dataCache.toString(), SpuDTO.class);
            } catch (Exception e) {
                LOG.error("Error when convert json to product");
                e.printStackTrace();
            }
        }
        return product;
    }
    public Page<SpuDTO> getSpuByQuickFilter(long minPrice, long maxPrice, List<Long> brandIds, Long categoryId, String key, List<String> value, String contentOrderBy, Pageable pageable) {

        brandIds = brandIds.isEmpty() ? null : brandIds;
        categoryId = categoryId == -1 ? null : categoryId;
        key = key.isEmpty() ? null : key;
        value = value.isEmpty() ? null : value;
        Page<SpuDTO> productsPage = fetchProductsByOrder(minPrice, maxPrice, brandIds, categoryId, key, value, contentOrderBy, pageable);

        List<SpuDTO> products = productsPage.getContent();
        products.forEach(product -> {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
            product.setImages(images);
        });

        return productsPage;
    }

    private Page<SpuDTO> fetchProductsByOrder(long minPrice, long maxPrice, List<Long> brandIds, Long categoryId, String key, List<String> value, String contentOrderBy, Pageable pageable) {
        if (contentOrderBy.equals("asc")) {
            return spuRepository.findBySpuFilterASCNew(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
         }
         else if(contentOrderBy.equals("desc")) {
             return spuRepository.findBySpuFilterDESCNew(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
         } else {
              return spuRepository.findBySpuFilterSALE(minPrice, maxPrice, brandIds,categoryId, key, value, pageable);
          }
    }


    public List<SpuDTO> getRelatedProduct(long category, int number) {
        //read from cache
        String key = "relatedProduct" + category;
        List<Object> dataCache = redisTemplate.opsForList().range(key, 0, -1);
        List<SpuDTO> selectedProducts = new ArrayList<>();
        // if cache is null
        if (dataCache.isEmpty()){
            LOG.info("Product not found in cache. list");
            // Lấy 20 sản phẩm có mã giảm giá cao nhất
            Pageable pageable = PageRequest.of(0, 20);
            List<SpuDTO> topDiscountedProducts = spuRepository.findTopDiscountedSpuByCategory(category, pageable);


            // Thêm sản phẩm ngẫu nhiên từ tất cả các sản phẩm
            selectedProducts.addAll(topDiscountedProducts);
            LOG.info("Product found in cache. list length 1"+selectedProducts.size());


            int attempts = 0;

            while (selectedProducts.size() < number && attempts < number) {
                int remainingCount = number - selectedProducts.size();
                List<SpuDTO> randomProducts = spuRepository.findRandomProducts(Pageable.ofSize(remainingCount));

                // Nếu không còn sản phẩm
                if (randomProducts.isEmpty()) {
                    break;
                }

                // Lọc và thêm sản phẩm
                for (SpuDTO product : randomProducts) {
                    if (selectedProducts.size() >= number) break;
                    // Kiểm tra xem sản phẩm
                    if (selectedProducts.stream().noneMatch(p -> p.getId() == product.getId())) {
                        selectedProducts.add(product);
                    }
                }

                attempts++;
            }

            // Thêm danh sách ảnh cho mỗi sản phẩm
            selectedProducts.forEach(product -> {
                List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
                product.setImages(images);
            });

            try {
                ObjectMapper mapper = new ObjectMapper();
                LOG.info("Product saved to cache. list length 2"+selectedProducts.size());
                for (SpuDTO product : selectedProducts) {
                    String productJson = mapper.writeValueAsString(product);
                    redisTemplate.opsForList().rightPush(key, productJson);
                }

                // set time expired
                redisTemplate.expire(key, 1200, java.util.concurrent.TimeUnit.SECONDS);

                // get 6 product from 20 product
                selectedProducts = getRandomProducts(selectedProducts, number);

            } catch (Exception e) {
                LOG.error("Error when save product to cache");
                e.printStackTrace();
            }

        }
        else{
            // have cache =>
            LOG.info("Product found in cache. list");

            try {
                ObjectMapper mapper = new ObjectMapper();
                for (Object productJson : dataCache) {
                    SpuDTO product = mapper.readValue(productJson.toString(), SpuDTO.class);
                    selectedProducts.add(product);
                }

                // get 6 product from 20 product
                selectedProducts = getRandomProducts(selectedProducts, number);

            } catch (Exception e) {
                LOG.info("ERROR::"+e.getMessage());
                e.printStackTrace();
            }
        }

        return selectedProducts;
    }


    //function get random 6 product from 20 product
    private List<SpuDTO> getRandomProducts(List<SpuDTO> listProduct, int number) {
        List<SpuDTO> selectedProducts = new ArrayList<>();
        if (!listProduct.isEmpty()) {
            Collections.shuffle(listProduct);
            for (SpuDTO product : listProduct) {
                if (selectedProducts.size() >= number) break;
                selectedProducts.add(product);
            }
        }
        return selectedProducts;
    }



    public List<SpuDTO> get20spTop(long category) {
        // Lấy 20 sản phẩm có mã giảm giá cao nhất
        Pageable pageable = PageRequest.of(0, 20);
        List<SpuDTO> selectedProducts = spuRepository.findTopDiscountedSpuByCategory(category, pageable);

        // Gan danh sach anh
        selectedProducts.forEach(product -> {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
            product.setImages(images);
        });

        return selectedProducts;
    }

    public List<String> getDistinctSizesByCategoryId(Long categoryId,String brandIds,Long minPrice,Long maxPrice) {
        categoryId = categoryId == -1 ? null : categoryId;
        brandIds = brandIds.isEmpty() ? null : brandIds;
        return spuRepository.findDistinctSizesByCategoryId(categoryId,brandIds,minPrice,maxPrice);
    }

    //Search
    public List<SpuDTO> getProductsByKey(String key) {
        List<SpuDTO> selectedProducts = spuRepository.findSpuByKeyword(key);
        selectedProducts.forEach(product -> {
            List<SpuImagesEntity> images = spuImagesRepository.findBySpuId(product.getId());
            product.setImages(images);
        });
        return selectedProducts;
    }

    @Override
    public List<String> getAllSlug() {
        return spuRepoCustom.findAllSlug();
    }


}
