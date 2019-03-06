package com.axboot.freelancer.domain.base.developer;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperRepository extends AXBootJPAQueryDSLRepository<Developer, Integer> {
}
