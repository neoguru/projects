package com.axboot.bjfms.domain.base.employee.gen;

import org.springframework.stereotype.Service;
import com.axboot.bjfms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class NoWorkerGenService extends BaseService<NoWorkerGen, Integer> {
    private NoWorkerGenRepository noWorkerGenRepository;

    @Inject
    public NoWorkerGenService(NoWorkerGenRepository noWorkerGenRepository) {
        super(noWorkerGenRepository);
        this.noWorkerGenRepository = noWorkerGenRepository;
    }

    public List<NoWorkerGen> gets(RequestParams<NoWorkerGen> requestParams) {
        return findAll();
    }
}