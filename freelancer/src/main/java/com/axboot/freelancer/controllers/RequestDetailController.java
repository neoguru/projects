package com.axboot.freelancer.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.freelancer.domain.request.detail.RequestDetail;
import com.axboot.freelancer.domain.request.detail.RequestDetailService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/requestdetail")
public class RequestDetailController extends BaseController {

    @Inject
    private RequestDetailService requestDetailService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<RequestDetail> requestParams) {
        List<RequestDetail> list = requestDetailService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<RequestDetail> request) {
        requestDetailService.save(request);
        return ok();
    }
}