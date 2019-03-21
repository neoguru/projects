package com.axboot.freelancer.domain;

import com.axboot.freelancer.domain.code.QCommonCode;
import com.axboot.freelancer.domain.file.QCommonFile;
import com.axboot.freelancer.domain.program.QProgram;
import com.axboot.freelancer.domain.program.menu.QMenu;
import com.axboot.freelancer.domain.program.mobileMenu.QMobileMenu;
import com.axboot.freelancer.domain.user.QUser;
import com.axboot.freelancer.domain.user.auth.QUserAuth;
import com.axboot.freelancer.domain.user.auth.menu.QAuthGroupMenu;
import com.axboot.freelancer.domain.user.role.QUserRole;

import com.axboot.freelancer.domain.notice.QNotice;
import com.axboot.freelancer.domain.notice.attach.QNoticeAttach;
import com.axboot.freelancer.domain.scheduler.QScheduler;
import com.axboot.freelancer.domain.scheduler.repeat.QSchedulerRepeat;
import com.axboot.freelancer.domain.scheduler.repeat.change.QSchedulerRepeatChange;

import com.axboot.freelancer.domain.base.partner.QPartner;
import com.axboot.freelancer.domain.base.partner.charge.QPartnerCharge;
import com.axboot.freelancer.domain.base.project.QProject;

import com.axboot.freelancer.domain.request.QRequest;
import com.axboot.freelancer.domain.request.detail.QRequestDetail;
import com.axboot.freelancer.domain.apply.QApply;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;

import java.io.Serializable;


public class BaseService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

    protected QUserRole qUserRole = QUserRole.userRole;
    protected QAuthGroupMenu qAuthGroupMenu = QAuthGroupMenu.authGroupMenu;
    protected QCommonCode qCommonCode = QCommonCode.commonCode;
    protected QUser qUser = QUser.user;
    protected QProgram qProgram = QProgram.program;
    protected QUserAuth qUserAuth = QUserAuth.userAuth;
    protected QMenu qMenu = QMenu.menu;
    protected QCommonFile qCommonFile = QCommonFile.commonFile;

    protected QMobileMenu qMobileMenu = QMobileMenu.mobileMenu;
    protected QNotice qNotice = QNotice.notice;
    protected QNoticeAttach qNoticeAttach = QNoticeAttach.noticeAttach;
    protected QScheduler qScheduler = QScheduler.scheduler;
    protected QSchedulerRepeat qSchedulerRepeat = QSchedulerRepeat.schedulerRepeat;
    protected QSchedulerRepeatChange qSchedulerRepeatChange = QSchedulerRepeatChange.schedulerRepeatChange;

    protected QPartner qPartner = QPartner.partner;
    protected QPartnerCharge qPartnerCharge = QPartnerCharge.partnerCharge;
    protected QProject qProject = QProject.project;

    protected QRequest qRequest = QRequest.request;
    protected QRequestDetail qRequestDetail = QRequestDetail.requestDetail;
    protected QApply qApply = QApply.apply;
    
    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseService() {
        super();
    }

    public BaseService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
}
