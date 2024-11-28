package runtrail.dev.backend.dto.response;

public class CollectionDTO {
    private Long id;
    private String collectionName;
    private String collectionImage;
    private String collectionLink;
    private Integer numericalOrder;





    public CollectionDTO(Long id, String collectionName, String collectionImage, String collectionLink, Integer numericalOrder) {
        this.id = id;
        this.collectionName = collectionName;
        this.collectionImage = collectionImage;
        this.collectionLink = collectionLink;
        this.numericalOrder = numericalOrder;
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
}
