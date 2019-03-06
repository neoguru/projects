package com.axboot.freelancer.domain.apply;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyRepository extends AXBootJPAQueryDSLRepository<Apply, Integer> {
}
