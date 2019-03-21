package com.axboot.freelancer.domain.base.developer.career;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperCareerRepository extends AXBootJPAQueryDSLRepository<DeveloperCareer, Integer> {
}
