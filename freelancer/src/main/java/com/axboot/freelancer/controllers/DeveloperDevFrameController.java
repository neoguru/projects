package com.axboot.freelancer.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.freelancer.domain.base.developer.dev.frame.DeveloperDevFrame;
import com.axboot.freelancer.domain.base.developer.dev.frame.DeveloperDevFrameService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/developerdevframe")
public class DeveloperDevFrameController extends BaseController {

    @Inject
    private DeveloperDevFrameService developerDevFrameService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<DeveloperDevFrame> requestParams) {
        List<DeveloperDevFrame> list = developerDevFrameService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<DeveloperDevFrame> request) {
        developerDevFrameService.save(request);
        return ok();
    }
}