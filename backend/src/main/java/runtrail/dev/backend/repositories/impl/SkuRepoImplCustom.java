package runtrail.dev.backend.repositories.impl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SkuPriceStockDTO;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.repositories.SkuRepoCustom;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Repository
public class SkuRepoImplCustom implements SkuRepoCustom {

    @Autowired
    private EntityManager em;
    @Override
    public SkuPriceStockDTO findStockAndPriceProductBySpuId(long spuId, Map<String,String> mapAttributes) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<SkuPriceStockDTO> query = builder.createQuery(SkuPriceStockDTO.class);

        Root<SkuEntity> root = query.from(SkuEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        Predicate spuIdEqual = builder.equal(root.get("spu").get("id"), spuId);
        predicates.add((spuIdEqual));

        for (Map.Entry<String,String> entry : mapAttributes.entrySet()) {
            Predicate predicate = builder.equal(builder.function("JSON_EXTRACT",String.class,root.get("skuAttri"),builder.literal("$."+entry.getKey())),entry.getValue());
            predicates.add(predicate);
        }

        query.where(predicates.toArray(new Predicate[predicates.size()]));

        //builder.function("JSON_ARRAYAGG", String.class, builder.function("JSON_MERGE_PATCH", String.class,root.get("skuAttri"),builder.function("JSON_OBJECT",String.class,builder.literal("stock"),root.get("skuStock")))).alias("hidden");
        //Predicate for price
        Predicate priceSkuPricePredicate = builder.equal(builder.max(root.get("skuPrice")), builder.min(root.get("skuPrice")));
        query.multiselect(builder.function("GROUP_CONCAT",String.class,root.get("id")).alias("skuId"),builder.sum(root.get("skuStock")).alias("totalStock"),builder.selectCase().when(priceSkuPricePredicate,builder.max(root.get("skuPrice"))).otherwise(builder.function("CONCAT",String.class,builder.min(root.get("skuPrice")),builder.literal("-"),builder.max(root.get("skuPrice")))).as(String.class).alias("skuPrice"),builder.function("JSON_ARRAYAGG", String.class, builder.function("JSON_MERGE_PATCH", String.class,root.get("skuAttri"),builder.function("JSON_OBJECT",String.class,builder.literal("stock"),root.get("skuStock")))).alias(""));

        TypedQuery<SkuPriceStockDTO> typedQuery = em.createQuery(query);

        return typedQuery.getSingleResult();
    }
}
