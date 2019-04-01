package com.axboot.pms.domain.assign;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.assign.BaseAssignService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class AssignService extends BaseAssignService<Assign, Integer> {
    private AssignRepository assignRepository;

    @Inject
    public AssignService(AssignRepository assignRepository) {
        super(assignRepository);
        this.assignRepository = assignRepository;
    }

    public List<Assign> gets(RequestParams<Assign> requestParams) {
        return findAll();
    }
}