package com.axboot.pms.domain.base.developer.bizArea;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperBizAreaRepository extends AXBootJPAQueryDSLRepository<DeveloperBizArea, Integer> {
}
