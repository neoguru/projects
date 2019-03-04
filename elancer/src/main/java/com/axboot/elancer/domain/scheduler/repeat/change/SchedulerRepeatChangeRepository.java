package com.axboot.elancer.domain.scheduler.repeat.change;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerRepeatChangeRepository extends AXBootJPAQueryDSLRepository<SchedulerRepeatChange, Integer> {
	List<SchedulerRepeatChange> findByNoSchedule(Integer noSchedule);
}
