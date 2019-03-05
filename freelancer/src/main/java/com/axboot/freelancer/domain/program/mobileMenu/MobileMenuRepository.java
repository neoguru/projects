package com.axboot.freelancer.domain.program.mobileMenu;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileMenuRepository extends AXBootJPAQueryDSLRepository<MobileMenu, Long> {
}
