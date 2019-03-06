package com.axboot.freelancer.domain.request.detail;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class RequestDetailService extends BaseService<RequestDetail, Integer> {
    private RequestDetailRepository requestDetailRepository;

    @Inject
    public RequestDetailService(RequestDetailRepository requestDetailRepository) {
        super(requestDetailRepository);
        this.requestDetailRepository = requestDetailRepository;
    }

    public List<RequestDetail> gets(RequestParams<RequestDetail> requestParams) {
        return findAll();
    }
}