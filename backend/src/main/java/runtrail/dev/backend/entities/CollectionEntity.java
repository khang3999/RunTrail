package runtrail.dev.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "collections")

public class CollectionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "collection_name")
    private String collectionName;

    @Column(name = "collection_image")
    private String collectionImage;

    @Column(name = "collection_link")
    private String collectionLink;

    @Column(name = "numerical_order")
    private int numericalOrder;

    @OneToMany(mappedBy = "collection", fetch = FetchType.LAZY)
    private List<CollectionProductEntity> products;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public String getCollectionImage() {
        return collectionImage;
    }

    public void setCollectionImage(String collectionImage) {
        this.collectionImage = collectionImage;
    }

    public String getCollectionLink() {
        return collectionLink;
    }

    public void setCollectionLink(String collectionLink) {
        this.collectionLink = collectionLink;
    }

    public int getNumericalOrder() {
        return numericalOrder;
    }

    public void setNumericalOrder(int numericalOrder) {
        this.numericalOrder = numericalOrder;
    }
}
