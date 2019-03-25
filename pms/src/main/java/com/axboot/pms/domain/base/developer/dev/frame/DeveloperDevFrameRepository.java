package com.axboot.pms.domain.base.developer.dev.frame;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperDevFrameRepository extends AXBootJPAQueryDSLRepository<DeveloperDevFrame, Integer> {
}
