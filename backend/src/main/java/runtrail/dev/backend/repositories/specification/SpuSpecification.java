package runtrail.dev.backend.repositories.specification;

import jakarta.persistence.Query;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import runtrail.dev.backend.controller.SpuController;
import runtrail.dev.backend.entities.BrandEntity;
import runtrail.dev.backend.entities.SkuEntity;
import runtrail.dev.backend.entities.SpuEntity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

public class SpuSpecification {

    public static Specification<SpuEntity> filterProduct(Long minPrice, Long maxPrice, List<Long> brandIds,Long categoryId,List<String> keys,List<List<String>> values) {
        return ((root, query, criteriaBuilder) -> {


            // === filter with price mix max === //
            // - JOIN table spu with sku
            Join<SkuEntity,SpuEntity> joinSku = root.join("skuList");
            Predicate priceMinPredicate = criteriaBuilder.greaterThanOrEqualTo(joinSku.get("skuPrice"),minPrice);
            Predicate priceMaxPredicate = criteriaBuilder.lessThanOrEqualTo(joinSku.get("skuPrice"),maxPrice);

            // filter brandIds
            final Path<BrandEntity> brand = root.<BrandEntity>get("brandId");
            Predicate brandIdsPredicate = (!brandIds.isEmpty()) ? brand.in(brandIds) : brand.isNotNull() ;

            // filter category

            // filter attribute sku
            List<Predicate> predicates = new ArrayList<>();

            for(int i=0;i<keys.size();i++) {
                Expression<String> attributeFilter = criteriaBuilder.function("JSON_EXTRACT",String.class,joinSku.get("skuAttri"),criteriaBuilder.literal("$."+keys.get(i)));
                Predicate predicate = attributeFilter.in(values.get(i));
                predicates.add(predicate);

            }

            // sku must have stock > 0
            Predicate stockSkuPredicate = criteriaBuilder.greaterThan(joinSku.get("skuStock"),0);


            // filter order by sku price with sku min price

            // filter
            predicates.add(priceMinPredicate);
            predicates.add(priceMaxPredicate);
            predicates.add(brandIdsPredicate);
            predicates.add(stockSkuPredicate);

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }

}
