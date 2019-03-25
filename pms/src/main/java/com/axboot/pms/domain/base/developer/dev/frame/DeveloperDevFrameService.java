package com.axboot.pms.domain.base.developer.dev.frame;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperDevFrameService extends BaseDeveloperService<DeveloperDevFrame, Integer> {
    private DeveloperDevFrameRepository developerDevFrameRepository;

    @Inject
    public DeveloperDevFrameService(DeveloperDevFrameRepository developerDevFrameRepository) {
        super(developerDevFrameRepository);
        this.developerDevFrameRepository = developerDevFrameRepository;
    }

    public List<DeveloperDevFrame> gets(RequestParams<DeveloperDevFrame> requestParams) {
        return findAll();
    }
}