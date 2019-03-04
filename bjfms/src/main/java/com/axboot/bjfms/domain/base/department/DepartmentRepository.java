package com.axboot.bjfms.domain.base.department;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends AXBootJPAQueryDSLRepository<Department, Integer> {
}
