package com.axboot.dipms.controllers;

import com.axboot.dipms.domain.user.User;
import com.axboot.dipms.domain.scheduler.Scheduler;
import com.axboot.dipms.domain.scheduler.SchedulerService;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/scheduler")
public class SchedulerController extends BaseController {

    @Inject
    private SchedulerService schedulerService;
/*
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Scheduler> requestParams) {
        List<Scheduler> list = schedulerService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }
*/

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON, params = "noSchedule")
    public Scheduler get(RequestParams requestParams) {
    	
        return schedulerService.getScheduler(requestParams);
    } 
    
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Scheduler[] array(RequestParams<Scheduler> requestParams) {
        List<Scheduler> list = schedulerService.gets(requestParams);
        Scheduler[] listToArray = list.toArray(new Scheduler[list.size()]);
        return listToArray;
    	
    }

    @RequestMapping(value = "/delete", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void delete(@RequestBody List<Scheduler> request)  throws Exception {
    	schedulerService.deleteSchedule(request);
    }
/*
    @RequestMapping(value = "/repeatDelete", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public void repeatDelete(@RequestBody List<Scheduler> request)  throws Exception {
    	schedulerService.repeatDelete(request);
    }
*/
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Scheduler> request) throws Exception {
        schedulerService.saveSchedule(request);
        return ok();
    }
}