package runtrail.dev.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class OrderEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;

   @Column(name = "account_id")
   private int accountId;

   @Column(name = "order_date")
   private String orderDate;

   @Column(name = "total_price")
   private double totalPrice;

   @Column(name = "status")
   private int status;

   @Column(name = "payment_id")
   private int paymentId;

   @Column(name = "shipping_fee")
   private double shippingFee;

   @Column(name = "shipping_address")
   private String shippingAddress;

   @Column(name = "discount")
   private double discount;

   @Column(name = "phone")
   private String phone;

   @Column(name = "customer_name")
   private String customerName;

   public OrderEntity() {
   }

   public OrderEntity(long id, double shippingFee, int accountId, String orderDate, double totalPrice, int status,
         int paymentId, String shippingAddress, double discount, String phone, String customerName) {
      this.id = id;
      this.shippingFee = shippingFee;
      this.accountId = accountId;
      this.orderDate = orderDate;
      this.totalPrice = totalPrice;
      this.status = status;
      this.paymentId = paymentId;
      this.shippingAddress = shippingAddress;
      this.discount = discount;
      this.phone = phone;
      this.customerName = customerName;
   }

   public OrderEntity(long id, String orderDate, int status, int paymentId, double shippingFee, String shippingAddress,
         double discount, String phone, String customerName, double totalPrice) {
      this.id = id;
      this.orderDate = orderDate;
      this.status = status;
      this.paymentId = paymentId;
      this.shippingFee = shippingFee;
      this.shippingAddress = shippingAddress;
      this.discount = discount;
      this.phone = phone;
      this.customerName = customerName;
      this.totalPrice = totalPrice;
   }

   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public int getAccountId() {
      return accountId;
   }

   public void setAccountId(int accountId) {
      this.accountId = accountId;
   }

   public String getOrderDate() {
      return orderDate;
   }

   public void setOrderDate(String orderDate) {
      this.orderDate = orderDate;
   }

   public double getTotalPrice() {
      return totalPrice;
   }

   public void setTotalPrice(double totalPrice) {
      this.totalPrice = totalPrice;
   }

   public int getStatus() {
      return status;
   }

   public void setStatus(int status) {
      this.status = status;
   }

   public int getPaymentId() {
      return paymentId;
   }

   public void setPaymentId(int paymentId) {
      this.paymentId = paymentId;
   }

   public double getShippingFee() {
      return shippingFee;
   }

   public void setShippingFee(double shippingFee) {
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
