package runtrail.dev.backend.services;
import runtrail.dev.backend.entities.OrderEntity;
import runtrail.dev.backend.entities.OrderProductEntity;

import java.util.List;

public interface OrderService {
    OrderEntity getOrderById(long id);
    OrderEntity createNewOrder(double totalPrice, int paymentId, int shippingFee, String shippingAddress, double discount, String phone, String customerName, List<OrderProductEntity> products);
    OrderEntity createNewOrderWithAccount(int accountId, double totalPrice, int paymentId, int shippingFee, String shippingAddress, double discount, String phone, String customerName);
}
