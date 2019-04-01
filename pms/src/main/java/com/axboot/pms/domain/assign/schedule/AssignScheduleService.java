package com.axboot.pms.domain.assign.schedule;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.assign.BaseAssignService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class AssignScheduleService extends BaseAssignService<AssignSchedule, Integer> {
    private AssignScheduleRepository assignScheduleRepository;

    @Inject
    public AssignScheduleService(AssignScheduleRepository assignScheduleRepository) {
        super(assignScheduleRepository);
        this.assignScheduleRepository = assignScheduleRepository;
    }

    public List<AssignSchedule> gets(RequestParams<AssignSchedule> requestParams) {
        return findAll();
    }
}