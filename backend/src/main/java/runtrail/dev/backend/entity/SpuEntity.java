package runtrail.dev.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;


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


    @Column(name = "category_id")
    private long categoryId;

    @Column(name = "brand_id")
    private long brandId;

    @Column(name = "discount")
    private int discount;

    @Column(name = "spu_status")
    private int spuStatus;


}
