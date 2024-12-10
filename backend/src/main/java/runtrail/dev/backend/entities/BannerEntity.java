package runtrail.dev.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "banners")
public class BannerEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "source", nullable = false)
    private String source;

    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "link_to")
    private String linkTo;
}
