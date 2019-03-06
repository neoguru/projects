package com.axboot.freelancer.domain.base.partner;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class PartnerService extends BaseService<Partner, Integer> {
    private PartnerRepository partnerRepository;

    @Inject
    public PartnerService(PartnerRepository partnerRepository) {
        super(partnerRepository);
        this.partnerRepository = partnerRepository;
    }

    public List<Partner> gets(RequestParams<Partner> requestParams) {
        return findAll();
    }
}