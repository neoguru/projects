package com.axboot.bjfms.domain.base.employee.gen;

import org.springframework.stereotype.Service;
import com.axboot.bjfms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class NoEmployeeGenService extends BaseService<NoEmployeeGen, Integer> {
    private NoEmployeeGenRepository noEmployeeGenRepository;

    @Inject
    public NoEmployeeGenService(NoEmployeeGenRepository noEmployeeGenRepository) {
        super(noEmployeeGenRepository);
        this.noEmployeeGenRepository = noEmployeeGenRepository;
    }

    public List<NoEmployeeGen> gets(RequestParams<NoEmployeeGen> requestParams) {
        return findAll();
    }
}