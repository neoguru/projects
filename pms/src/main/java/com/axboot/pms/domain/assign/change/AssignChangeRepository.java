package com.axboot.pms.domain.assign.change;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignChangeRepository extends AXBootJPAQueryDSLRepository<AssignChange, Integer> {
}
