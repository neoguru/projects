package com.axboot.freelancer.domain.base.partner.charge;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerChargeRepository extends AXBootJPAQueryDSLRepository<PartnerCharge, Integer> {
}
