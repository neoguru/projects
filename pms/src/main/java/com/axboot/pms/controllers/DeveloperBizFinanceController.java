package com.axboot.pms.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.axboot.pms.domain.base.developer.bizArea.finance.DeveloperBizFinance;
import com.axboot.pms.domain.base.developer.bizArea.finance.DeveloperBizFinanceService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/developerbizfinance")
public class DeveloperBizFinanceController extends BaseController {

    @Inject
    private DeveloperBizFinanceService developerBizFinanceService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<DeveloperBizFinance> requestParams) {
        List<DeveloperBizFinance> list = developerBizFinanceService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<DeveloperBizFinance> request) {
        developerBizFinanceService.save(request);
        return ok();
    }
}