package com.axboot.pms.domain.assign;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignRepository extends AXBootJPAQueryDSLRepository<Assign, Integer> {
}
