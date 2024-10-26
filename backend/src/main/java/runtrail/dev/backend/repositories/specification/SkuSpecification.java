package runtrail.dev.backend.repositories.specification;

import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import runtrail.dev.backend.entities.SkuEntity;

public class SkuSpecification {

    public static Specification<SkuEntity> findPriceAndStockProduct(Long spuId){
        return new Specification<SkuEntity>() {
            @Override
            public Predicate toPredicate(Root<SkuEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                //create cribu for sku
                CriteriaQuery<SkuEntity> cr = criteriaBuilder.createQuery(SkuEntity.class);
                cr.select(root);

                query.multiselect(root.get("id"),root.get("skuName")).where(criteriaBuilder.equal(root.get("id"), spuId));
                return query.getGroupRestriction();
            }
        };
    }
}
