package runtrail.dev.backend.dto.request;

import runtrail.dev.backend.entities.OrderProductEntity;

import java.util.List;

public class OrderRequest {
    private double totalPrice;
    private int paymentId;
    private int shippingFee;
    private String shippingAddress;
    private double discount;
    private String phone;
    private String customerName;
    private List<OrderProductEntity> products;

    public List<OrderProductEntity> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProductEntity> products) {
        this.products = products;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
