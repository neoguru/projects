package com.axboot.pms.domain.assign.schedule;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignScheduleRepository extends AXBootJPAQueryDSLRepository<AssignSchedule, Integer> {
}
