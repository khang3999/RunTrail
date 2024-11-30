package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "collection_product")
public class CollectionProductEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;

    @ManyToOne
    @JoinColumn(name = "collection_id", nullable = false)
    @JsonBackReference
    private CollectionEntity collection;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private SpuEntity spu;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CollectionEntity getCollection() {
        return collection;
    }

    public void setCollection(CollectionEntity collection) {
        this.collection = collection;
    }

    public SpuEntity getSpu() {
        return spu;
    }

    public void setSpu(SpuEntity spu) {
        this.spu = spu;
    }
}
