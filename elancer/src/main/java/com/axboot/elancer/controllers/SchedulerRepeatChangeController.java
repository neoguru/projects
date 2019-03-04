package com.axboot.elancer.controllers;

import com.axboot.elancer.domain.scheduler.repeat.SchedulerRepeat;
import com.axboot.elancer.domain.scheduler.repeat.change.SchedulerRepeatChange;
import com.axboot.elancer.domain.scheduler.repeat.change.SchedulerRepeatChangeService;

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
@RequestMapping(value = "/api/v1/schedulerrepeatchange")
public class SchedulerRepeatChangeController extends BaseController {

    @Inject
    private SchedulerRepeatChangeService schedulerRepeatChangeService;

    
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public SchedulerRepeatChange[] array(RequestParams<SchedulerRepeatChange> requestParams) {
        List<SchedulerRepeatChange> list = schedulerRepeatChangeService.gets(requestParams);
        SchedulerRepeatChange[] listToArray = list.toArray(new SchedulerRepeatChange[list.size()]);
        return listToArray;
    	
    }
    
    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<SchedulerRepeatChange> request) {
        schedulerRepeatChangeService.save(request);
        return ok();
    }
}