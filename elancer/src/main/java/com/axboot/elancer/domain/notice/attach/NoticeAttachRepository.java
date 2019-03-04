package com.axboot.elancer.domain.notice.attach;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeAttachRepository extends AXBootJPAQueryDSLRepository<NoticeAttach, Integer> {
	List<NoticeAttach> findByNoNotice(Integer noNotice);
}
