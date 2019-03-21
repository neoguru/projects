package com.axboot.freelancer.domain.base.developer.biz.enterprise;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperBizEnterpriseRepository extends AXBootJPAQueryDSLRepository<DeveloperBizEnterprise, Integer> {
}
