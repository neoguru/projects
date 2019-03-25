package com.axboot.pms.domain.base.developer.bizArea.task.enterprise;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperTaskEnterpriseRepository extends AXBootJPAQueryDSLRepository<DeveloperTaskEnterprise, Integer> {
}
