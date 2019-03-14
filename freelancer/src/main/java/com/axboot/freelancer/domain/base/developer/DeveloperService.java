package com.axboot.freelancer.domain.base.developer;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.util.List;

@Service
public class DeveloperService extends BaseService<Developer, Integer> {
    private DeveloperRepository developerRepository;

    @Inject
    public DeveloperService(DeveloperRepository developerRepository) {
        super(developerRepository);
        this.developerRepository = developerRepository;
    }

    public List<Developer> gets(RequestParams<Developer> requestParams) {
    	
    		String nmDeveloper = requestParams.getString("headNmDeveloper");
    		
    		BooleanBuilder builder = new BooleanBuilder();        

    		if (isNotEmpty(nmDeveloper)){
      	 		builder.and(qDeveloper.nmDeveloper.like(Expressions.asString("%").concat(nmDeveloper).concat("%")));
            }
    		
    		List<Developer> list = select().from(qDeveloper).where(builder).orderBy(qDeveloper.noDeveloper.desc()).fetch();    	 	
    	
        return list;        
        
    }
}