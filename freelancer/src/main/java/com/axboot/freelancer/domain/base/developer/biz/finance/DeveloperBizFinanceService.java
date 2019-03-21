package com.axboot.freelancer.domain.base.developer.biz.finance;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperBizFinanceService extends BaseDeveloperService<DeveloperBizFinance, Integer> {
    private DeveloperBizFinanceRepository developerBizFinanceRepository;

    @Inject
    public DeveloperBizFinanceService(DeveloperBizFinanceRepository developerBizFinanceRepository) {
        super(developerBizFinanceRepository);
        this.developerBizFinanceRepository = developerBizFinanceRepository;
    }

    public List<DeveloperBizFinance> gets(RequestParams<DeveloperBizFinance> requestParams) {
        return findAll();
    }
}