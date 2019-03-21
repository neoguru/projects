package com.axboot.freelancer.domain.base.developer.dev.uitool;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperDevUitoolService extends BaseDeveloperService<DeveloperDevUitool, Integer> {
    private DeveloperDevUitoolRepository developerDevUitoolRepository;

    @Inject
    public DeveloperDevUitoolService(DeveloperDevUitoolRepository developerDevUitoolRepository) {
        super(developerDevUitoolRepository);
        this.developerDevUitoolRepository = developerDevUitoolRepository;
    }

    public List<DeveloperDevUitool> gets(RequestParams<DeveloperDevUitool> requestParams) {
        return findAll();
    }
}