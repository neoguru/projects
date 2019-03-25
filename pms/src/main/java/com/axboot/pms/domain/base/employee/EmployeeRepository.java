package com.axboot.pms.domain.base.employee;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends AXBootJPAQueryDSLRepository<Employee, Integer> {
}
