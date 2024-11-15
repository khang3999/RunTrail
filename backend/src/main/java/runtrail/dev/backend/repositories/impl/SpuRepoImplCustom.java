package runtrail.dev.backend.repositories.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.entities.SpuImagesEntity;
import runtrail.dev.backend.repositories.SpuRepoCustom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SpuRepoImplCustom implements SpuRepoCustom {
    @Autowired
    private EntityManager em;
    @Override
    public SpuDTO findProductBySlug(String slug) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<SpuEntity> query = builder.createQuery(SpuEntity.class);


        Root<SpuEntity> root = query.from(SpuEntity.class);
        Join<SpuEntity,SpuImagesEntity> joinImages = root.join("images");

        query.where(builder.equal(root.get("slug"), slug));

        TypedQuery<SpuEntity> typedQuery = em.createQuery(query);

        SpuEntity spu = typedQuery.getSingleResult();

        //COVERT SKU TO SPU ATTRIBUTES
        // convert to spuAttributes = "{Size: [L, M],Color: [White, Black]}"
        List<String> skuAttri = new ArrayList<>();
        spu.getSkuList().forEach(skuEntity -> {
            skuAttri.add(skuEntity.getSkuAttri());
        });

        // convert skuAttri to Map
        Map<String, List<String>> spuAttributes = new HashMap<>();
        for (String attri : skuAttri) {
            String[] attriArr = attri.replace("\\",",").replace("{","").replace("}","").split(",");
            for(String attriStr: attriArr){
                System.out.println("attriStr: "+attriStr);
                String[] attriStrArr = attriStr.split(":");
                String key = attriStrArr[0].trim().replace("\"","");
                String value = attriStrArr[1].trim().replace("\"","");
                try {
                    if (spuAttributes.containsKey(key)) {
                        List<String> valueList = spuAttributes.get(key);
                        if (!valueList.contains(value)) {
                            valueList.add(value);
                        }
                    } else {
                        List<String> valueList = new ArrayList<>();
                        valueList.add(value);
                        spuAttributes.put(key, valueList);
                    }
                } catch (Exception e) {
                   System.out.println("Error: "+e.getMessage());
                }
            }
        }

        // convert mapSpuAttributes to String = "{Size: [L, M],Color: [White, Black]}"
        ObjectMapper mapper = new ObjectMapper();
        String spuAttributesStr = null;
        try {
            spuAttributesStr = mapper.writeValueAsString(spuAttributes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // END CONVERT SKU TO SPU ATTRIBUTES

        return new SpuDTO(
                spu.getId(),
                spu.getSpuNo(),
                spu.getSpuName(),
                spu.getSpuDescription(),
                spu.getImages(),
                spu.getCategoryId(),
                spu.getBrand().getBrandName(),
                spu.getSpuStatus(),
                spu.getDiscount(),
                spu.getSlug(),
                spuAttributesStr
        );
    }

    @Override
    public List<String> findAllSlug() {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<String> query = builder.createQuery(String.class);
        Root<SpuEntity> root = query.from(SpuEntity.class);
        query.select(root.get("slug"));
        TypedQuery<String> typedQuery = em.createQuery(query);
        return typedQuery.getResultList();
    }
}
