package com.axboot.pms.domain.assign;

import com.axboot.pms.domain.assign.QAssign;
import com.axboot.pms.domain.assign.change.QAssignChange;
import com.axboot.pms.domain.assign.schedule.QAssignSchedule;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

import java.io.Serializable;


public class BaseAssignService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

    protected QAssign qAssign = QAssign.assign;
    protected QAssignChange qAssignChange = QAssignChange.assignChange;
    protected QAssignSchedule qAssignSchedule = QAssignSchedule.assignSchedule;
    
    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseAssignService() {
        super();
    }

    public BaseAssignService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
}
