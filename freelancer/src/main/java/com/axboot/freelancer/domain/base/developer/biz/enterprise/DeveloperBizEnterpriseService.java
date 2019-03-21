package com.axboot.freelancer.domain.base.developer.biz.enterprise;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperBizEnterpriseService extends BaseDeveloperService<DeveloperBizEnterprise, Integer> {
    private DeveloperBizEnterpriseRepository developerBizEnterpriseRepository;

    @Inject
    public DeveloperBizEnterpriseService(DeveloperBizEnterpriseRepository developerBizEnterpriseRepository) {
        super(developerBizEnterpriseRepository);
        this.developerBizEnterpriseRepository = developerBizEnterpriseRepository;
    }

    public List<DeveloperBizEnterprise> gets(RequestParams<DeveloperBizEnterprise> requestParams) {
        return findAll();
    }
}