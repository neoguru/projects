package com.axboot.pms.domain.base.employee;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class EmployeeService extends BaseService<Employee, Integer> {
    private EmployeeRepository employeeRepository;

    @Inject
    public EmployeeService(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> gets(RequestParams<Employee> requestParams) {
        return findAll();
    }
}