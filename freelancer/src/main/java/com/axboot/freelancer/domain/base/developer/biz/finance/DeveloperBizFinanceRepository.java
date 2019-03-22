package com.axboot.freelancer.domain.base.developer.biz.finance;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperBizFinanceRepository extends AXBootJPAQueryDSLRepository<DeveloperBizFinance, Integer> {
}