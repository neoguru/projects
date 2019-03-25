package com.axboot.pms.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.pms.domain.base.employee.history.EmployeeHistory;
import com.axboot.pms.domain.base.employee.history.EmployeeHistoryService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/employeehistory")
public class EmployeeHistoryController extends BaseController {

    @Inject
    private EmployeeHistoryService employeeHistoryService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<EmployeeHistory> requestParams) {
        List<EmployeeHistory> list = employeeHistoryService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<EmployeeHistory> request) {
        employeeHistoryService.save(request);
        return ok();
    }
}