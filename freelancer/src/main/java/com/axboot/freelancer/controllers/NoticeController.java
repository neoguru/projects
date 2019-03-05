package com.axboot.freelancer.controllers;

import com.axboot.freelancer.domain.notice.Notice;
import com.axboot.freelancer.domain.notice.NoticeService;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/notice")
public class NoticeController extends BaseController {

    @Inject
    private NoticeService noticeService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Notice> requestParams) {
        List<Notice> list = noticeService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON, params = "noNotice")
    public Notice get(RequestParams requestParams) {
        return noticeService.getNotice(requestParams);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Notice> request) throws Exception {
        noticeService.saveNotice(request);
        return ok();
    }
}
