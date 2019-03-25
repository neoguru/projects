package com.axboot.pms.domain.base.customer;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends AXBootJPAQueryDSLRepository<Customer, Integer> {
}
