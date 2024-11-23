package runtrail.dev.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "brand")
public class BrandEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brand_name", nullable = false, length = 50)
    private String brandName;

    @Column(name = "brand_desc")
    private String brandDesc;

    @Column(name = "brand_logo", nullable = false)
    private String brandLogo;


}
