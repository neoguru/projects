package com.axboot.freelancer.domain.request;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class RequestService extends BaseService<Request, Integer> {
    private RequestRepository requestRepository;

    @Inject
    public RequestService(RequestRepository requestRepository) {
        super(requestRepository);
        this.requestRepository = requestRepository;
    }

    public List<Request> gets(RequestParams<Request> requestParams) {
        return findAll();
    }
}