package com.axboot.bjfms.domain.base.department;

import com.axboot.bjfms.domain.BaseService;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DepartmentService extends BaseService<Department, Integer> {
    private DepartmentRepository departmentRepository;

    @Inject
    public DepartmentService(DepartmentRepository departmentRepository) {
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }

    public List<Department> gets(RequestParams<Department> requestParams) {
        return findAll();
    }
}
