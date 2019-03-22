package com.axboot.freelancer.domain.base.project;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import com.axboot.freelancer.domain.base.partner.Partner;

import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

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
    	
		String nmProject = requestParams.getString("headNmProject");
		String nmCustomer = requestParams.getString("headNmCustomer");

		BooleanBuilder builder = new BooleanBuilder();        

		if (isNotEmpty(nmProject)){
  	 		builder.and(qProject.nmProject.like(Expressions.asString("%").concat(nmProject).concat("%")));
        }

		if (isNotEmpty(nmCustomer)){
  	 		builder.and(qProject.nmCustomer.like(Expressions.asString("%").concat(nmCustomer).concat("%")));
        }

		List<Project> list = select().from(qProject).where(builder).orderBy(qProject.noProject.desc()).fetch();   	
    	
        return list;
    }
}