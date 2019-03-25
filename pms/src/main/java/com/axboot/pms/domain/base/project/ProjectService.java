package com.axboot.pms.domain.base.project;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
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
		Integer noCustomer = requestParams.getInt("headNoCustomer");

		BooleanBuilder builder = new BooleanBuilder();        

		if (isNotEmpty(nmProject)){
  	 		builder.and(qProject.nmProject.like(Expressions.asString("%").concat(nmProject).concat("%")));
        }

		if (noCustomer > 0){
  	 		builder.and(qProject.noCustomer.eq(noCustomer));
        }

		List<Project> list = select().from(qProject).where(builder).orderBy(qProject.noProject.desc()).fetch();   	
    	
        return list;
    }
    
}