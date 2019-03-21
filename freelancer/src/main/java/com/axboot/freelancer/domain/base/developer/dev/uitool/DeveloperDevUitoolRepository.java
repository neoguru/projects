package com.axboot.freelancer.domain.base.developer.dev.uitool;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperDevUitoolRepository extends AXBootJPAQueryDSLRepository<DeveloperDevUitool, Integer> {
}
