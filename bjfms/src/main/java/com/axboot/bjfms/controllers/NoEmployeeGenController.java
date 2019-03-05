package com.axboot.bjfms.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.bjfms.domain.base.employee.gen.NoEmployeeGen;
import com.axboot.bjfms.domain.base.employee.gen.NoEmployeeGenService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/noemployeegen")
public class NoEmployeeGenController extends BaseController {

    @Inject
    private NoEmployeeGenService noEmployeeGenService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<NoEmployeeGen> requestParams) {
        List<NoEmployeeGen> list = noEmployeeGenService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<NoEmployeeGen> request) {
        noEmployeeGenService.save(request);
        return ok();
    }
}