package runtrail.dev.backend.entity;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity
@Table(name = "sku")
public class SkuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "spu_id")
    private long spuId;

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

    
}
