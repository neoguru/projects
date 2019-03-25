package com.axboot.pms.domain.base.developer.dev.lang;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.base.developer.BaseDeveloperService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class DeveloperDevLangService extends BaseDeveloperService<DeveloperDevLang, Integer> {
    private DeveloperDevLangRepository developerDevLangRepository;

    @Inject
    public DeveloperDevLangService(DeveloperDevLangRepository developerDevLangRepository) {
        super(developerDevLangRepository);
        this.developerDevLangRepository = developerDevLangRepository;
    }

    public List<DeveloperDevLang> gets(RequestParams<DeveloperDevLang> requestParams) {
        return findAll();
    }
}