package com.axboot.freelancer.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.freelancer.domain.base.developer.dev.uitool.DeveloperDevUitool;
import com.axboot.freelancer.domain.base.developer.dev.uitool.DeveloperDevUitoolService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/developerdevuitool")
public class DeveloperDevUitoolController extends BaseController {

    @Inject
    private DeveloperDevUitoolService developerDevUitoolService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<DeveloperDevUitool> requestParams) {
        List<DeveloperDevUitool> list = developerDevUitoolService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<DeveloperDevUitool> request) {
        developerDevUitoolService.save(request);
        return ok();
    }
}