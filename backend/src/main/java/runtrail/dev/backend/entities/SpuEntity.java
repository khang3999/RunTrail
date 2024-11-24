package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "spu")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpuEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "spu_name", nullable = false, length = 200)
    private String spuName;

    @Lob
    @Column(name = "spu_description",columnDefinition = "TEXT")
    private String spuDescription;

    @Column(name = "category_id")
    private Long categoryId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;

    @Column(name = "slug")
    private String slug;

    @Column(name = "spu_no")
    private String spuNo;

    @Column(name = "discount")
    private int discount;

    @Column(name = "spu_status")
    private int spuStatus;

    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @OneToMany(mappedBy = "spu",fetch = FetchType.EAGER)
    private Set<SkuEntity> skuList;

    @JsonManagedReference
    @OneToMany(mappedBy = "spu",fetch = FetchType.LAZY)
    private List<SpuImagesEntity> images;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpuName() {
        return spuName;
    }

    public void setSpuName(String spuName) {
        this.spuName = spuName;
    }

    public String getSpuDescription() {
        return spuDescription;
    }

    public void setSpuDescription(String spuDescription) {
        this.spuDescription = spuDescription;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public BrandEntity getBrand() {
        return brand;
    }

    public void setBrand(BrandEntity brand) {
        this.brand = brand;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getSpuNo() {
        return spuNo;
    }

    public void setSpuNo(String spuNo) {
        this.spuNo = spuNo;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public int getSpuStatus() {
        return spuStatus;
    }

    public void setSpuStatus(int spuStatus) {
        this.spuStatus = spuStatus;
    }

    public Set<SkuEntity> getSkuList() {
        return skuList;
    }

    public void setSkuList(Set<SkuEntity> skuList) {
        this.skuList = skuList;
    }

    public List<SpuImagesEntity> getImages() {
        return images;
    }

    public void setImages(List<SpuImagesEntity> images) {
        this.images = images;
    }
}
