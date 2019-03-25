package com.axboot.pms.domain.base.project;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends AXBootJPAQueryDSLRepository<Project, Integer> {
}
