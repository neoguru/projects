package com.axboot.freelancer.domain.base.developer;

import java.io.Serializable;

import com.axboot.freelancer.domain.base.developer.biz.QDeveloperBizArea;
import com.axboot.freelancer.domain.base.developer.biz.enterprise.QDeveloperBizEnterprise;
import com.axboot.freelancer.domain.base.developer.biz.finance.QDeveloperBizFinance;
import com.axboot.freelancer.domain.base.developer.biz.task.enterprise.QDeveloperTaskEnterprise;
import com.axboot.freelancer.domain.base.developer.biz.task.finance.QDeveloperTaskFinance;
import com.axboot.freelancer.domain.base.developer.career.QDeveloperCareer;
import com.axboot.freelancer.domain.base.developer.dev.db.QDeveloperDevDb;
import com.axboot.freelancer.domain.base.developer.dev.frame.QDeveloperDevFrame;
import com.axboot.freelancer.domain.base.developer.dev.lang.QDeveloperDevLang;
import com.axboot.freelancer.domain.base.developer.dev.uitool.QDeveloperDevUitool;

import com.axboot.freelancer.domain.base.developer.history.QDeveloperHistory;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

public class BaseDeveloperService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

	protected QDeveloper qDeveloper = QDeveloper.developer;
	
	protected QDeveloperBizArea qDeveloperBizArea = QDeveloperBizArea.developerBizArea;
	protected QDeveloperBizEnterprise qDeveloperBizEnterprise = QDeveloperBizEnterprise.developerBizEnterprise;
	protected QDeveloperBizFinance qDeveloperBizFinance = QDeveloperBizFinance.developerBizFinance;
	protected QDeveloperTaskEnterprise qDeveloperTaskEnterprise = QDeveloperTaskEnterprise.developerTaskEnterprise;
	protected QDeveloperTaskFinance qDeveloperTaskFinance = QDeveloperTaskFinance.developerTaskFinance;
	
	protected QDeveloperDevDb qDeveloperDevDb = QDeveloperDevDb.developerDevDb;
	protected QDeveloperDevFrame qDeveloperDevFrame = QDeveloperDevFrame.developerDevFrame;
	protected QDeveloperDevLang qDeveloperDevLang = QDeveloperDevLang.developerDevLang;
	protected QDeveloperDevUitool qDeveloperDevUitool = QDeveloperDevUitool.developerDevUitool;

	protected QDeveloperCareer qDeveloperCareer = QDeveloperCareer.developerCareer;
	protected QDeveloperHistory qDeveloperHistory = QDeveloperHistory.developerHistory;
	
    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseDeveloperService() {
        super();
    }

    public BaseDeveloperService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
   
}
