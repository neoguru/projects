package com.axboot.freelancer.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.freelancer.domain.base.developer.biz.task.enterprise.DeveloperTaskEnterprise;
import com.axboot.freelancer.domain.base.developer.biz.task.enterprise.DeveloperTaskEnterpriseService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/developertaskenterprise")
public class DeveloperTaskEnterpriseController extends BaseController {

    @Inject
    private DeveloperTaskEnterpriseService developerTaskEnterpriseService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<DeveloperTaskEnterprise> requestParams) {
        List<DeveloperTaskEnterprise> list = developerTaskEnterpriseService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<DeveloperTaskEnterprise> request) {
        developerTaskEnterpriseService.save(request);
        return ok();
    }
}