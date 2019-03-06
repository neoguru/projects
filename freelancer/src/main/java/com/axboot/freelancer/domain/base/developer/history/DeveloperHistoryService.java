package com.axboot.freelancer.domain.base.developer.history;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperHistoryService extends BaseService<DeveloperHistory, Integer> {
    private DeveloperHistoryRepository developerHistoryRepository;

    @Inject
    public DeveloperHistoryService(DeveloperHistoryRepository developerHistoryRepository) {
        super(developerHistoryRepository);
        this.developerHistoryRepository = developerHistoryRepository;
    }

    public List<DeveloperHistory> gets(RequestParams<DeveloperHistory> requestParams) {
        return findAll();
    }
}