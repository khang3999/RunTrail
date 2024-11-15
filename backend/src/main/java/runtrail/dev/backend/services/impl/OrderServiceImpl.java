package runtrail.dev.backend.services.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.OrderEntity;
import runtrail.dev.backend.entities.OrderProductEntity;
import runtrail.dev.backend.repositories.OrderProductRepository;
import runtrail.dev.backend.repositories.OrderRepository;
import runtrail.dev.backend.services.OrderService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
   @Autowired
   private OrderRepository orderRepository;

   @Autowired
   private OrderProductRepository orderProductRepository;

   @Override
   public OrderEntity getOrderById(long id) {
      return orderRepository.getOrderById(id);
   }

   @Transactional
   @Override
   public OrderEntity createNewOrder(double totalPrice, int paymentId, int shippingFee, String shippingAddress,
                                     double discount, String phone, String customerName, List<OrderProductEntity> products) {

      OrderEntity newOrder = new OrderEntity();
      newOrder.setTotalPrice(totalPrice);
      newOrder.setPaymentId(paymentId);
      newOrder.setShippingFee(shippingFee);
      newOrder.setShippingAddress(shippingAddress);
      newOrder.setDiscount(discount);
      newOrder.setPhone(phone);
      newOrder.setCustomerName(customerName);
      newOrder.setOrderDate(LocalDateTime.now().toString());


      OrderEntity savedOrder = orderRepository.save(newOrder);


      for (OrderProductEntity product : products) {
         product.setOrderId(savedOrder.getId());
         System.out.println("Product ID: " + product.getProductId() + ", Price: " + product.getPrice() + ", Quantity: " + product.getQuantity());
      }

      orderProductRepository.saveAll(products);

      return savedOrder;
   }


   @Override
   public OrderEntity createNewOrderWithAccount(int accountId, double totalPrice, int paymentId, int shippingFee,
         String shippingAddress, double discount, String phone, String customerName) {
      return null;
   }
}
