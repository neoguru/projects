package com.axboot.pms.domain.base.developer;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.util.List;

@Service
public class DeveloperService extends BaseDeveloperService<Developer, Integer> {
    private DeveloperRepository developerRepository;

    @Inject
    public DeveloperService(DeveloperRepository developerRepository) {
        super(developerRepository);
        this.developerRepository = developerRepository;
    }

    public List<Developer> gets(RequestParams<Developer> requestParams) {
		
		String nmDeveloper = requestParams.getString("headNmDeveloper");
		String ynCareer = requestParams.getString("headYnCareer");
		String ynLicense = requestParams.getString("headYnLicense");
		
		String bizArea = requestParams.getString("headBizArea");

		String bizEnterprise = requestParams.getString("headEnterpriseArea");
		String taskEnterprise = requestParams.getString("headEnterpriseTask");
		String bizFinance = requestParams.getString("headFinanceArea");
		String taskFinance = requestParams.getString("headFinanceTask");
		
		String devLang = requestParams.getString("headDevLang");
		String devFrame = requestParams.getString("headDevFrame");
		String uiTool = requestParams.getString("headUiTool");
		String database = requestParams.getString("headDb");

		BooleanBuilder builder = new BooleanBuilder();        

		if (isNotEmpty(nmDeveloper)){
  	 		builder.and(qDeveloper.nmDeveloper.like(Expressions.asString("%").concat(nmDeveloper).concat("%")));
        }

		if (isNotEmpty(ynCareer)){
  	 		builder.and(qDeveloper.ynCareer.eq(ynCareer));
        }

		if (isNotEmpty(ynLicense)){
  	 		builder.and(qDeveloper.ynLicense.eq(ynLicense));
        }
       

        if (isNotEmpty(bizArea)) {
            builder.and(qDeveloperBizArea.bizArea.eq(bizArea));
        }

        if (isNotEmpty(bizEnterprise)) {
            builder.and(qDeveloperBizEnterprise.enterpriseArea.eq(bizEnterprise));
        }

        if (isNotEmpty(bizFinance)) {
            builder.and(qDeveloperBizFinance.financeArea.eq(bizFinance));
        }

        if (isNotEmpty(taskEnterprise)) {
            builder.and(qDeveloperTaskEnterprise.enterpriseTask.eq(taskEnterprise));
        }

        if (isNotEmpty(taskFinance)) {
            builder.and(qDeveloperTaskFinance.financeTask.eq(taskFinance));
        }

        if (isNotEmpty(database)) {
            builder.and(qDeveloperDevDb.devDb.eq(database));
        }

        if (isNotEmpty(devFrame)) {
            builder.and(qDeveloperDevFrame.devFrame.eq(devFrame));
        }

        if (isNotEmpty(devLang)) {
            builder.and(qDeveloperDevLang.devLang.eq(devLang));
        }

        if (isNotEmpty(uiTool)) {
            builder.and(qDeveloperDevUitool.uiTool.eq(uiTool));
        }

		List<Developer> list = select()
																		.from(qDeveloper)
																		
																			.leftJoin(qDeveloper.bizAreaList, qDeveloperBizArea)
																			.leftJoin(qDeveloper.bizEnterpriseList, qDeveloperBizEnterprise)
																			.leftJoin(qDeveloper.bizFinanceList, qDeveloperBizFinance)
																			.leftJoin(qDeveloper.taskEnterpriseList, qDeveloperTaskEnterprise)
																			.leftJoin(qDeveloper.taskFinanceList, qDeveloperTaskFinance)
																			.leftJoin(qDeveloper.devDbList, qDeveloperDevDb)
																			.leftJoin(qDeveloper.devFrameList, qDeveloperDevFrame)
																			.leftJoin(qDeveloper.devLangList, qDeveloperDevLang)
																			.leftJoin(qDeveloper.devUitoolList, qDeveloperDevUitool)
//																			.fetchJoin()    																			
																		.where(builder).orderBy(qDeveloper.noDeveloper.desc()).groupBy(qDeveloper.noDeveloper)
																		.fetch();    	 	
		
		 return list;        
    
    }
}