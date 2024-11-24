package runtrail.dev.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import runtrail.dev.backend.entities.NewSpuEntity;
import runtrail.dev.backend.services.NewSpuService;

import java.util.List;

@Service
public class NewSpuServiceImpl implements NewSpuService {

    @Override
    public List<NewSpuEntity> getAllSpus() {
        return List.of();
    }
}
