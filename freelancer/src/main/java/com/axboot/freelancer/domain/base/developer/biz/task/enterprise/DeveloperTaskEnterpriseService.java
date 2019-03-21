package com.axboot.freelancer.domain.base.developer.biz.task.enterprise;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperTaskEnterpriseService extends BaseDeveloperService<DeveloperTaskEnterprise, Integer> {
    private DeveloperTaskEnterpriseRepository developerTaskEnterpriseRepository;

    @Inject
    public DeveloperTaskEnterpriseService(DeveloperTaskEnterpriseRepository developerTaskEnterpriseRepository) {
        super(developerTaskEnterpriseRepository);
        this.developerTaskEnterpriseRepository = developerTaskEnterpriseRepository;
    }

    public List<DeveloperTaskEnterprise> gets(RequestParams<DeveloperTaskEnterprise> requestParams) {
        return findAll();
    }
}