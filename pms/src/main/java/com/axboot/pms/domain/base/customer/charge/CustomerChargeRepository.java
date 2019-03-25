package com.axboot.pms.domain.base.customer.charge;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerChargeRepository extends AXBootJPAQueryDSLRepository<CustomerCharge, Integer> {
}
