package com.axboot.freelancer.domain.apply;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class ApplyService extends BaseService<Apply, Integer> {
    private ApplyRepository applyRepository;

    @Inject
    public ApplyService(ApplyRepository applyRepository) {
        super(applyRepository);
        this.applyRepository = applyRepository;
    }

    public List<Apply> gets(RequestParams<Apply> requestParams) {
        return findAll();
    }
}