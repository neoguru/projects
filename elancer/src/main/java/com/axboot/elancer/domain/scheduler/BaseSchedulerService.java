package com.axboot.elancer.domain.scheduler;

import com.axboot.elancer.domain.scheduler.repeat.QSchedulerRepeat;
import com.axboot.elancer.domain.scheduler.repeat.change.QSchedulerRepeatChange;

import java.io.Serializable;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

public class BaseSchedulerService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

	protected QScheduler qScheduler = QScheduler.scheduler;
	protected QSchedulerRepeat qSchedulerRepeat = QSchedulerRepeat.schedulerRepeat;
	protected QSchedulerRepeatChange qSchedulerRepeatChange = QSchedulerRepeatChange.schedulerRepeatChange;

    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseSchedulerService() {
        super();
    }

    public BaseSchedulerService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
    
}
