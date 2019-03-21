package com.axboot.freelancer.domain.base.developer.biz.task.finance;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperTaskFinanceRepository extends AXBootJPAQueryDSLRepository<DeveloperTaskFinance, Integer> {
}
