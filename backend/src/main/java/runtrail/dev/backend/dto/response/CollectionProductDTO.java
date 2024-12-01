package runtrail.dev.backend.dto.response;

import runtrail.dev.backend.entities.SpuEntity;

import java.util.List;

public class CollectionProductDTO {
    private Long id;
    private String collectionName;
    private String collectionImage;
    private String collectionLink;
    private Integer numericalOrder;
    private List<SpuEntity> products;



    public CollectionProductDTO(Long id, String collectionName, String collectionImage, String collectionLink, Integer numericalOrder, List<SpuEntity> products) {
        this.id = id;
        this.collectionName = collectionName;
        this.collectionImage = collectionImage;
        this.collectionLink = collectionLink;
        this.numericalOrder = numericalOrder;
        this.products = products;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Integer getNumericalOrder() {
        return numericalOrder;
    }

    public void setNumericalOrder(Integer numericalOrder) {
        this.numericalOrder = numericalOrder;
    }

    public List<SpuEntity> getProducts() {
        return products;
    }

    public void setProducts(List<SpuEntity> products) {
        this.products = products;
    }
}
