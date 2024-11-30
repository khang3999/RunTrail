package runtrail.dev.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import runtrail.dev.backend.dto.response.CollectionDTO;
import runtrail.dev.backend.dto.response.Response;
import runtrail.dev.backend.entities.CollectionEntity;
import runtrail.dev.backend.entities.CollectionProductEntity;
import runtrail.dev.backend.entities.SpuEntity;
import runtrail.dev.backend.services.CollectionService;


import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/collection")
public class CollectionController {

   @Autowired
   private CollectionService collectionService;

   @GetMapping("/{id}")
   public Response<CollectionEntity> getCollectionById(@PathVariable long id) {
      CollectionEntity collection = collectionService.getCollectionById(id);

      if (collection != null) {
         return new Response<>(collection, HttpStatus.OK.value(), "Get collection detail successfully");
      } else {
         return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Collection not found");
      }
   }

   @GetMapping("/all")
   public Response<List<CollectionEntity>> getAllCollections() {
      List<CollectionEntity> collections = collectionService.getOrderedCollectionProducts();

      if (collections != null) {
         return new Response<>(collections, HttpStatus.OK.value(), "Get collections successfully");
      } else {
         return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Collection not found");
      }
   }

   @GetMapping("/{id}/products")
   public Response<List<SpuEntity>> getCollectionProducts(@PathVariable long id) {
      List<SpuEntity> products = collectionService.getProductListOfCollection(id);

      if (products != null) {
         return new Response<>(products, HttpStatus.OK.value(), "Get collection product list successfully");
      } else {
         return new Response<>(null, HttpStatus.BAD_REQUEST.value(), "Collection not found");
      }
   }
}
