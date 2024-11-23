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

//    @Column(name="spu_attributes",columnDefinition = "json")
//    private String spuAttributes;

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

}
