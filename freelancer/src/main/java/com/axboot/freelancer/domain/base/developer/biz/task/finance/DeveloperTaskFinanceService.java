package com.axboot.freelancer.domain.base.developer.biz.task.finance;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperTaskFinanceService extends BaseDeveloperService<DeveloperTaskFinance, Integer> {
    private DeveloperTaskFinanceRepository developerTaskFinanceRepository;

    @Inject
    public DeveloperTaskFinanceService(DeveloperTaskFinanceRepository developerTaskFinanceRepository) {
        super(developerTaskFinanceRepository);
        this.developerTaskFinanceRepository = developerTaskFinanceRepository;
    }

    public List<DeveloperTaskFinance> gets(RequestParams<DeveloperTaskFinance> requestParams) {
        return findAll();
    }
}