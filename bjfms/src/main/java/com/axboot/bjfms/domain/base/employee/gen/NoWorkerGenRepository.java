package com.axboot.bjfms.domain.base.employee.gen;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoWorkerGenRepository extends AXBootJPAQueryDSLRepository<NoWorkerGen, Integer> {
}
