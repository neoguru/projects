package com.axboot.freelancer.domain.base.developer.career;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperCareerService extends BaseDeveloperService<DeveloperCareer, Integer> {
    private DeveloperCareerRepository developerCareerRepository;

    @Inject
    public DeveloperCareerService(DeveloperCareerRepository developerCareerRepository) {
        super(developerCareerRepository);
        this.developerCareerRepository = developerCareerRepository;
    }

    public List<DeveloperCareer> gets(RequestParams<DeveloperCareer> requestParams) {
        return findAll();
    }
}