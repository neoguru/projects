package com.axboot.pms.controllers;

import com.axboot.pms.domain.user.User;
import com.axboot.pms.domain.scheduler.Scheduler;
import com.axboot.pms.domain.scheduler.repeat.SchedulerRepeat;
import com.axboot.pms.domain.scheduler.repeat.SchedulerRepeatService;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/schedulerrepeat")
public class SchedulerRepeatController extends BaseController {

    @Inject
    private SchedulerRepeatService schedulerRepeatService;

/*
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<SchedulerRepeat> requestParams) {
        List<SchedulerRepeat> list = schedulerRepeatService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }
*/

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON, params = "noSchedule")
    public SchedulerRepeat get(RequestParams requestParams) {
    	
        return schedulerRepeatService.getRepeatBase(requestParams);
    } 

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public SchedulerRepeat[] array(RequestParams<SchedulerRepeat> requestParams) {
        List<SchedulerRepeat> list = schedulerRepeatService.gets(requestParams);
        SchedulerRepeat[] listToArray = list.toArray(new SchedulerRepeat[list.size()]);
        return listToArray;
    	
    }

    @RequestMapping(value = "/deleteAll", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void repeatDeleteAll(@RequestBody List<SchedulerRepeat> request)  throws Exception {
    	schedulerRepeatService.repeatDeleteAll(request);
    }

    @RequestMapping(value = "/deleteNext", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void repeatDeleteNext(@RequestBody List<SchedulerRepeat> request)  throws Exception {
    	schedulerRepeatService.repeatDeleteNext(request);
    }

    @RequestMapping(value = "/updateAll", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void repeatUpdateAll(@RequestBody List<SchedulerRepeat> request)  throws Exception {
    	schedulerRepeatService.repeatUpdateAll(request);
    }

    @RequestMapping(value = "/updateNext", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void repeatUpdateNext(@RequestBody List<SchedulerRepeat> request)  throws Exception {
    	schedulerRepeatService.repeatUpdateNext(request);
    }

    
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<SchedulerRepeat> request) {
        schedulerRepeatService.save(request);
        return ok();
    }
}