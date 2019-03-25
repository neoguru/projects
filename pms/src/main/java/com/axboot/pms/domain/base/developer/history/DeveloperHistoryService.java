package com.axboot.pms.domain.base.developer.history;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperHistoryService extends BaseDeveloperService<DeveloperHistory, Integer> {
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