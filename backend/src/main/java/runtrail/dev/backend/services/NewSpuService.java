package runtrail.dev.backend.services;

import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.NewSpuEntity;
import runtrail.dev.backend.entities.SpuEntity;

import java.util.List;

@Service
public interface NewSpuService {
    List<NewSpuEntity> getAllSpus();
}
