package com.axboot.bjfms.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.bjfms.domain.base.employee.gen.NoWorkerGen;
import com.axboot.bjfms.domain.base.employee.gen.NoWorkerGenService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/noworkergen")
public class NoWorkerGenController extends BaseController {

    @Inject
    private NoWorkerGenService noWorkerGenService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<NoWorkerGen> requestParams) {
        List<NoWorkerGen> list = noWorkerGenService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<NoWorkerGen> request) {
        noWorkerGenService.save(request);
        return ok();
    }
}