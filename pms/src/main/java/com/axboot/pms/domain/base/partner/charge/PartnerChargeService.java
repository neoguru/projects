package com.axboot.pms.domain.base.partner.charge;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class PartnerChargeService extends BaseService<PartnerCharge, Integer> {
    private PartnerChargeRepository partnerChargeRepository;

    @Inject
    public PartnerChargeService(PartnerChargeRepository partnerChargeRepository) {
        super(partnerChargeRepository);
        this.partnerChargeRepository = partnerChargeRepository;
    }

    public List<PartnerCharge> gets(RequestParams<PartnerCharge> requestParams) {
        return findAll();
    }
}