package com.axboot.freelancer.domain.user;


import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends AXBootJPAQueryDSLRepository<User, String> {
}
