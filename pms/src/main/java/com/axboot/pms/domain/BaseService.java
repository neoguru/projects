package com.axboot.pms.domain;

import com.axboot.pms.domain.code.QCommonCode;
import com.axboot.pms.domain.file.QCommonFile;
import com.axboot.pms.domain.program.QProgram;
import com.axboot.pms.domain.program.menu.QMenu;
import com.axboot.pms.domain.program.mobileMenu.QMobileMenu;
import com.axboot.pms.domain.user.QUser;
import com.axboot.pms.domain.user.auth.QUserAuth;
import com.axboot.pms.domain.user.auth.menu.QAuthGroupMenu;
import com.axboot.pms.domain.user.role.QUserRole;
import com.axboot.pms.domain.notice.QNotice;
import com.axboot.pms.domain.notice.attach.QNoticeAttach;
import com.axboot.pms.domain.scheduler.QScheduler;
import com.axboot.pms.domain.scheduler.repeat.QSchedulerRepeat;
import com.axboot.pms.domain.scheduler.repeat.change.QSchedulerRepeatChange;
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
    
    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseService() {
        super();
    }

    public BaseService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
}
