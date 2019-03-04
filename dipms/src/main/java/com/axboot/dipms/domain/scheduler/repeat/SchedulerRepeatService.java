package com.axboot.dipms.domain.scheduler.repeat;

import com.axboot.dipms.domain.user.User;
import com.axboot.dipms.domain.BaseService;
import com.axboot.dipms.domain.scheduler.Scheduler;
import com.axboot.dipms.domain.scheduler.SchedulerRepository;
import com.axboot.dipms.domain.scheduler.SchedulerService;
import com.axboot.dipms.domain.scheduler.repeat.change.SchedulerRepeatChange;
import com.axboot.dipms.domain.scheduler.repeat.change.SchedulerRepeatChangeService;

import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;

import java.time.LocalDate;
import java.util.List;

@Service
public class SchedulerRepeatService extends BaseService<SchedulerRepeat, Integer> {
    private SchedulerRepeatRepository schedulerRepeatRepository;

    @Inject
    private SchedulerService schedulerService;

    @Inject
    private SchedulerRepeatChangeService schedulerRepeatChangeService;

    @Inject
    public SchedulerRepeatService(SchedulerRepeatRepository schedulerRepeatRepository) {
        super(schedulerRepeatRepository);
        this.schedulerRepeatRepository = schedulerRepeatRepository;
    }

    public SchedulerRepeat getRepeatBase(RequestParams requestParams) {
    	
    	SchedulerRepeat repeat = gets(requestParams).stream().findAny().orElse(null);

        return repeat;
    }

    @Transactional 
    public void repeatDeleteAll(List<SchedulerRepeat> repeats) throws Exception {

    	if (isNotEmpty(repeats)) {

    		for (SchedulerRepeat repeat: repeats) {	
    			delete(repeat.getId());
    			if (isNotEmpty(repeat.getChangeList()))
    				schedulerRepeatChangeService.delete(repeat.getChangeList());
    			schedulerService.delete(repeat.getId());    			    			
    		}
    	}
    }

    @Transactional 
    public void repeatDeleteNext(List<SchedulerRepeat> repeats) throws Exception {

    	if (isNotEmpty(repeats)) {

    		for (SchedulerRepeat repeat: repeats) {	
    			save(repeat);
    			if (isNotEmpty(repeat.getChangeList())) {
    				for (SchedulerRepeatChange change: repeat.getChangeList()) {
    					if (change.getStart().isAfter(repeat.getDtEndRepeat()))
    	    				schedulerRepeatChangeService.delete(change);    						
    				}
    			}		
    		}
    	}
    }

    @Transactional 
    public void repeatUpdateAll(List<SchedulerRepeat> repeats) throws Exception {

    	if (isNotEmpty(repeats)) {

    		for (SchedulerRepeat repeat: repeats) {			
    			save(repeat);
    			
    			if (isNotEmpty(repeat.getChangeList()))
    				schedulerRepeatChangeService.delete(repeat.getChangeList());

    			schedulerService.save(repeat.getScheduler());    			    	
    		}
    	}
    }

    @Transactional 
    public void repeatUpdateNext(List<SchedulerRepeat> repeats) throws Exception {

    	if (isNotEmpty(repeats)) {

    		for (SchedulerRepeat repeat: repeats) {	
    			save(repeat);
    			if (isNotEmpty(repeat.getChangeList())) {
    				for (SchedulerRepeatChange change: repeat.getChangeList()) {
    					if (change.getStart().isAfter(repeat.getDtEndRepeat()))
    	    				schedulerRepeatChangeService.delete(change);    						
    				}
    			}		
    		}
    	}
    }

    public List<SchedulerRepeat> gets(RequestParams requestParams) {

   	 	String baseDate = requestParams.getString("baseDate");
   	 	Integer noEmployee = requestParams.getInt("noEmployee");
   	 	Integer noSchedule = requestParams.getInt("noSchedule");
   	 	
        BooleanBuilder builder = new BooleanBuilder();

        if (noEmployee > 0)
        	builder.and(qSchedulerRepeat.scheduler.noEmployee.eq(noEmployee));

        if (noSchedule > 0)
        	builder.and(qSchedulerRepeat.noSchedule.eq(noSchedule));
        
        if (isNotEmpty(baseDate)) {
        	LocalDate localDate = LocalDate.parse(baseDate);
        	LocalDate dtStart = LocalDate.parse(baseDate);
        	LocalDate dtEnd = LocalDate.parse(baseDate);
        	
        	dtStart = dtStart.minusMonths(1);
        	dtEnd = dtEnd.plusMonths(1);
        	
        	dtStart = LocalDate.of(dtStart.getYear(), dtStart.getMonthValue(), 01);
        	dtEnd = LocalDate.of(dtEnd.getYear(), dtEnd.getMonthValue(), dtEnd.lengthOfMonth());

        	/**************************************************************************
        	 * 이벤트 시작일자가 기준월의 말일보다는 작거나 같고
        	 * 이벤트 종료일자가 기준월의 1일보다는 크거나 같은 경우
        	 ***************************************************************************/
        	builder.and(qSchedulerRepeat.scheduler.start.loe(dtEnd));
        	builder.and(qSchedulerRepeat.dtEndRepeat.goe(dtStart));
        	
        }
    	
        List<SchedulerRepeat> schedulesRepeate = select().from(qSchedulerRepeat).where(builder).fetch();
        
        return schedulesRepeate;
    }
}