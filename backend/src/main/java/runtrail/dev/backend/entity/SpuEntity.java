package runtrail.dev.backend.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "spu")
public class SpuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "spu_name", nullable = false, length = 100)
    private String spuName;

    @Column(name = "spu_description")
    private String spuDescription;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @Column(name = "brand_id")
    private long brandId;

    @Column(name = "spu_status")
    private int spuStatus;


}
