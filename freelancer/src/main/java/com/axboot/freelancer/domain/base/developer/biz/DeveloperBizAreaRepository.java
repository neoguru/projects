package com.axboot.freelancer.domain.base.developer.biz;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperBizAreaRepository extends AXBootJPAQueryDSLRepository<DeveloperBizArea, Integer> {
}
