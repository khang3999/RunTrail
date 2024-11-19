package runtrail.dev.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import runtrail.dev.backend.entities.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
   @Query("SELECT o FROM OrderEntity o WHERE o.id = :orderId")
   OrderEntity getOrderById(@Param("orderId") long orderId);
}
