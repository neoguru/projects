package com.axboot.dipms.domain.notice;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends AXBootJPAQueryDSLRepository<Notice, Integer> {
}
