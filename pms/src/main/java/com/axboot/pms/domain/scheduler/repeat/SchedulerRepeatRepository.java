package com.axboot.pms.domain.scheduler.repeat;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerRepeatRepository extends AXBootJPAQueryDSLRepository<SchedulerRepeat, Integer> {
}
