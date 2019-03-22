package com.axboot.ozpms.domain.scheduler;

import com.axboot.ozpms.domain.user.User;
import com.axboot.ozpms.domain.BaseService;
import com.axboot.ozpms.domain.scheduler.repeat.SchedulerRepeatService;
import com.axboot.ozpms.domain.scheduler.repeat.change.SchedulerRepeatChange;
import com.axboot.ozpms.domain.scheduler.repeat.change.SchedulerRepeatChangeService;

import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SchedulerService extends BaseService<Scheduler, Integer> {
	
    private SchedulerRepository schedulerRepository;

    @Inject
    private SchedulerRepeatService schedulerRepeatService;

    @Inject
    private SchedulerRepeatChangeService schedulerRepeatChangeService;

    @Inject
    public SchedulerService(SchedulerRepository schedulerRepository) {
        super(schedulerRepository);
        this.schedulerRepository = schedulerRepository;
    }

    @Transactional 
    public void deleteSchedule(List<Scheduler> schedulers) throws Exception {

    	if (isNotEmpty(schedulers)) {

    		for (Scheduler scheduler: schedulers) {	
    			delete(scheduler.getId());    			    			
    		}
    	}
    }
/*
    @Transactional 
    public void repeatDelete(List<Scheduler> schedulers) throws Exception {

    	if (isNotEmpty(schedulers)) {

    		for (Scheduler scheduler: schedulers) {	
    			schedulerRepeatService.delete(scheduler.getId());
    			schedulerRepeatChangeService.delete(scheduler.getId());
    			delete(scheduler.getId());    			    			
    		}
    	}
    }
*/
    @Transactional 
    public void saveSchedule(List<Scheduler> schedulers) throws Exception {
    	/*
    	 * 신규등록과 전체일정 수정의 경우 실행되는 method
    	 */
    	if (isNotEmpty(schedulers)) {

    		for (Scheduler scheduler: schedulers) {
    			
    			//Scheduler save
    			save(scheduler);    			
    			
    			//SchedulerRepeat save
    			if (scheduler.getRepeatSave() != null) {
    				scheduler.getRepeatSave().setNoSchedule(scheduler.getNoSchedule());
    				schedulerRepeatService.save(scheduler.getRepeatSave());     			
    			}

    			List<SchedulerRepeatChange> changeList = schedulerRepeatChangeService.getChangeList(scheduler.getId());
    			if (isNotEmpty(changeList))
        			schedulerRepeatChangeService.delete(changeList);
    		}
    	}
    }    

    public Scheduler getScheduler(RequestParams requestParams) {

    	Scheduler scheduler = gets(requestParams).stream().findAny().orElse(null);
    	return scheduler;
    	
    }
    
    
    public List<Scheduler> gets(RequestParams requestParams) {

   	 	String baseDate = requestParams.getString("baseDate");
   	 	Integer noEmployee = requestParams.getInt("noEmployee");
   	 	Integer noSchedule = requestParams.getInt("noSchedule");

        BooleanBuilder builder = new BooleanBuilder();

    	builder.and(qScheduler.ynRepeat.eq("NONE"));													//반복없는 event만 get
    	
        if (noEmployee > 0)
        	builder.and(qScheduler.noEmployee.eq(noEmployee));

        if (noSchedule > 0)
        	builder.and(qScheduler.noSchedule.eq(noSchedule));

        if (isNotEmpty(baseDate)) {
        	LocalDate localDate = LocalDate.parse(baseDate);
        	LocalDate dtStart = LocalDate.parse(baseDate);
        	LocalDate dtEnd = LocalDate.parse(baseDate);
        	
        	dtStart = dtStart.minusMonths(1);
        	dtEnd = dtEnd.plusMonths(1);
        	
        	dtStart = LocalDate.of(dtStart.getYear(), dtStart.getMonthValue(), 01);
        	dtEnd = LocalDate.of(dtEnd.getYear(), dtEnd.getMonthValue(), dtEnd.lengthOfMonth());
        	
        	builder.and(qScheduler.start.between(dtStart, dtEnd));

        }
    	
        List<Scheduler> schedules = select().from(qScheduler).where(builder).fetch();

        return schedules;
    }
}

