package com.axboot.freelancer.domain.base.developer;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperService extends BaseService<Developer, Integer> {
    private DeveloperRepository developerRepository;

    @Inject
    public DeveloperService(DeveloperRepository developerRepository) {
        super(developerRepository);
        this.developerRepository = developerRepository;
    }

    public List<Developer> gets(RequestParams<Developer> requestParams) {
        return findAll();
    }
}