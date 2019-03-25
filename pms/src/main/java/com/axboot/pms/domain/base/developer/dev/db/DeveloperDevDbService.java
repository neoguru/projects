package com.axboot.pms.domain.base.developer.dev.db;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperDevDbService extends BaseDeveloperService<DeveloperDevDb, Integer> {
    private DeveloperDevDbRepository developerDevDbRepository;

    @Inject
    public DeveloperDevDbService(DeveloperDevDbRepository developerDevDbRepository) {
        super(developerDevDbRepository);
        this.developerDevDbRepository = developerDevDbRepository;
    }

    public List<DeveloperDevDb> gets(RequestParams<DeveloperDevDb> requestParams) {
        return findAll();
    }
}