package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.request.OrderRequest;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.entities.OrderEntity;
import runtrail.dev.backend.services.OrderService;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

   @Autowired
   private OrderService orderService;

   @GetMapping("/{id}")
   public Response<OrderEntity> getOrderById(@PathVariable long id) {
      OrderEntity order = orderService.getOrderById(id);

      if (order != null) {
         return new Response<>(order, HttpStatus.OK.value(), "Get order detail successfully");
      } else {
         return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Order not found");
      }
   }

   @PostMapping("/new")
   public Response<OrderEntity> createNewOrder(@RequestBody OrderRequest orderRequest) {
      
      OrderEntity order = orderService.createNewOrder(orderRequest.getTotalPrice(), orderRequest.getPaymentId(),
            orderRequest.getShippingFee(), orderRequest.getShippingAddress(), orderRequest.getDiscount(),
            orderRequest.getPhone(), orderRequest.getCustomerName(), orderRequest.getProducts());

      if (order != null) {
         return new Response<>(order, HttpStatus.OK.value(), "Create order successfully");
      } else {
         return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Can not create order");
      }
   }
}
