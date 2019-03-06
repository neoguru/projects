package com.axboot.freelancer.domain.base.project;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class ProjectService extends BaseService<Project, Integer> {
    private ProjectRepository projectRepository;

    @Inject
    public ProjectService(ProjectRepository projectRepository) {
        super(projectRepository);
        this.projectRepository = projectRepository;
    }

    public List<Project> gets(RequestParams<Project> requestParams) {
        return findAll();
    }
}