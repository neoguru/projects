package com.axboot.bjfms.controllers;

import com.axboot.bjfms.domain.base.employee.Employee;
import com.axboot.bjfms.domain.base.employee.EmployeeService;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/employee")
public class EmployeeController extends BaseController {

    @Inject
    private EmployeeService employeeService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Employee> requestParams) {
        List<Employee> list = employeeService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }    

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON, params = "noEmployee")
    public Employee get(RequestParams requestParams) {
    	
        return employeeService.getEmployee(requestParams);
    } 

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Employee> request) throws Exception {
        employeeService.saveEmployee(request);
        return ok();
    }
}
