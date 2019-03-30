package com.axboot.pms.domain.assign.change;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class AssignChangeService extends BaseService<AssignChange, Integer> {
    private AssignChangeRepository assignChangeRepository;

    @Inject
    public AssignChangeService(AssignChangeRepository assignChangeRepository) {
        super(assignChangeRepository);
        this.assignChangeRepository = assignChangeRepository;
    }

    public List<AssignChange> gets(RequestParams<AssignChange> requestParams) {
        return findAll();
    }
}