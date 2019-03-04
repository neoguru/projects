package com.axboot.dipms.domain.scheduler;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerRepository extends AXBootJPAQueryDSLRepository<Scheduler, Integer> {
}
