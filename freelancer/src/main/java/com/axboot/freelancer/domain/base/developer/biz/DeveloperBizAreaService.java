package com.axboot.freelancer.domain.base.developer.biz;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperBizAreaService extends BaseDeveloperService<DeveloperBizArea, Integer> {
    private DeveloperBizAreaRepository developerBizAreaRepository;

    @Inject
    public DeveloperBizAreaService(DeveloperBizAreaRepository developerBizAreaRepository) {
        super(developerBizAreaRepository);
        this.developerBizAreaRepository = developerBizAreaRepository;
    }

    public List<DeveloperBizArea> gets(RequestParams<DeveloperBizArea> requestParams) {
        return findAll();
    }
}