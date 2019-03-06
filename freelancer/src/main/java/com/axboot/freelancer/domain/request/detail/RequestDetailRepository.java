package com.axboot.freelancer.domain.request.detail;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestDetailRepository extends AXBootJPAQueryDSLRepository<RequestDetail, Integer> {
}
