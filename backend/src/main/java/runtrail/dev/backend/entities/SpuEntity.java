package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "spu")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "spu_name", nullable = false, length = 100)
    private String spuName;

    @Column(name = "spu_description")
    private String spuDescription;

    @Column(name = "category_id")
    private long categoryId;

    @Column(name = "brand_id")
    private long brandId;

    @Column(name = "discount")
    private int discount;

    @Column(name = "spu_status")
    private int spuStatus;


    //
    @JsonManagedReference
    @OneToMany(mappedBy = "spu",fetch = FetchType.EAGER)
    private List<SkuEntity> skuList;

    @JsonManagedReference
    @OneToMany(mappedBy = "spu",fetch = FetchType.EAGER)
    private List<SpuImagesEntity> images;

}
