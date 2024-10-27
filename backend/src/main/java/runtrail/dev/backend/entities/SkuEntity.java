package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "sku")

public class SkuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "spu_id", nullable = false)
    private SpuEntity spu;


    @Column(name = "sku_name", nullable = false, length = 100)
    private String skuName;

    @Column(name = "sku_description")
    private String skuDescription;

    @Column(name = "sku_status")
    private int skuStatus;

    @Column(name = "sku_stock")
    private long skuStock;

    @Column(name = "sku_price")
    private long skuPrice;

    @Column(name = "sku_attri", columnDefinition = "json")
    private String skuAttri;

    @JsonManagedReference
    @OneToMany(mappedBy = "sku",fetch = FetchType.EAGER)
    private List<SkuImagesEntity> images;


    
}
