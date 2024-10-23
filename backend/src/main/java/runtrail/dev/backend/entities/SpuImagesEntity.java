package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "spu_images")
public class SpuImagesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "spu_id", nullable = false)
    private SpuEntity spu;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "img_url", nullable = false)
    private String imgUrl;

    @Column(name = "img_default")
    private int imgDefault;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "update_time")
    private Date updateTime;

}
