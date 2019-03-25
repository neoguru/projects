package com.axboot.pms.domain.base.employee.history;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class EmployeeHistoryService extends BaseService<EmployeeHistory, Integer> {
    private EmployeeHistoryRepository employeeHistoryRepository;

    @Inject
    public EmployeeHistoryService(EmployeeHistoryRepository employeeHistoryRepository) {
        super(employeeHistoryRepository);
        this.employeeHistoryRepository = employeeHistoryRepository;
    }

    public List<EmployeeHistory> gets(RequestParams<EmployeeHistory> requestParams) {
        return findAll();
    }
}