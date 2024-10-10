package runtrail.dev.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import runtrail.dev.backend.dto.response.SpuDTO;
import runtrail.dev.backend.entity.SpuEntity;

@Repository
public interface SpuRepository extends JpaRepository<SpuEntity, Long> {
    List<SpuEntity> findBySpuName(String spuName);

    // find Spu filter and contain price, thumb
    @Query("SELECT new runtrail.dev.backend.dto.response.SpuDTO(u.id, u.spuName, u.spuDescription, u.categoryId, u.brandId, MIN(sk.skuPrice), 'images', u.spuStatus) " +
            "FROM SpuEntity u " +
            "INNER JOIN SkuEntity sk ON sk.spu.id = u.id " +
            "WHERE sk.skuPrice >= ?1 AND sk.skuPrice <= ?2 " +
            "AND (?3 IS NULL OR u.brandId IN ?3) " +
            "GROUP BY u.id " +
            "ORDER BY MIN(sk.skuPrice)")
    Page<SpuDTO> findBySpuFilter(long minPrice, long maxPrice, List<Long> brandIds, Pageable pageable);
//    import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//
//    public Page<SpuDTO> filterSpu(long minPrice, long maxPrice, List<Long> brandIds, String sortOrder, int page, int size) {
//        Sort sort = Sort.by("minPrice"); // Trường 'minPrice' phải khớp với tên trong DTO hoặc thực thể
//        if ("DESC".equalsIgnoreCase(sortOrder)) {
//            sort = sort.descending();
//        } else {
//            sort = sort.ascending();
//        }
//
//        Pageable pageable = PageRequest.of(page, size, sort);
//        return spuRepository.findBySpuFilter(minPrice, maxPrice, brandIds, pageable);
//    }

}
