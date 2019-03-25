package com.axboot.pms.domain.base.developer;

import java.io.Serializable;

import com.axboot.pms.domain.base.developer.bizArea.QDeveloperBizArea;
import com.axboot.pms.domain.base.developer.bizArea.enterprise.QDeveloperBizEnterprise;
import com.axboot.pms.domain.base.developer.bizArea.finance.QDeveloperBizFinance;
import com.axboot.pms.domain.base.developer.bizArea.task.enterprise.QDeveloperTaskEnterprise;
import com.axboot.pms.domain.base.developer.bizArea.task.finance.QDeveloperTaskFinance;
import com.axboot.pms.domain.base.developer.dev.db.QDeveloperDevDb;
import com.axboot.pms.domain.base.developer.dev.frame.QDeveloperDevFrame;
import com.axboot.pms.domain.base.developer.dev.lang.QDeveloperDevLang;
import com.axboot.pms.domain.base.developer.dev.uitool.QDeveloperDevUitool;

import com.axboot.pms.domain.base.developer.history.QDeveloperHistory;

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
