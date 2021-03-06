package com.axboot.freelancer.domain.base.partner;

import org.springframework.stereotype.Service;
import com.axboot.freelancer.domain.BaseService;
import com.axboot.freelancer.domain.base.partner.charge.PartnerCharge;
import com.axboot.freelancer.domain.base.partner.charge.PartnerChargeService;

import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.util.List;

@Service
public class PartnerService extends BaseService<Partner, Integer> {
    private PartnerRepository partnerRepository;

    @Inject
    private PartnerChargeService partnerChargeService;
    
    @Inject
    public PartnerService(PartnerRepository partnerRepository) {
        super(partnerRepository);
        this.partnerRepository = partnerRepository;
    }

    @Transactional
    public void savePartner(List<Partner> partners) throws Exception {
    	
    	if (isNotEmpty(partners)) {
    		
    		for (Partner partner : partners) {

    			save(partner);
    			
    			if (partner.getChargeListq() != null) {
    				System.out.println("0000000000000");
    				for (PartnerCharge pc : partner.getChargeListq()) {
    					if (pc.getNoPartner() == null) {
    	    				System.out.println(partner.getNoPartner());
    						pc.setNoPartner(partner.getNoPartner());
    					}
    				}
    				partnerChargeService.save(partner.getChargeListq());
    			}
				
    		}
    	}
    }
    	
    public List<Partner> gets(RequestParams<Partner> requestParams) {
    	
		String nmPartner = requestParams.getString("headNmPartner");
		String nmCeo = requestParams.getString("headNmCeo");
		String ynTrade = requestParams.getString("headYnTrade");

		BooleanBuilder builder = new BooleanBuilder();        

		if (isNotEmpty(nmPartner)){
  	 		builder.and(qPartner.nmPartner.like(Expressions.asString("%").concat(nmPartner).concat("%")));
        }

		if (isNotEmpty(nmCeo)){
  	 		builder.and(qPartner.nmCeo.like(Expressions.asString("%").concat(nmCeo).concat("%")));
        }

		if (isNotEmpty(ynTrade)){
            builder.and(qPartner.ynTrade.eq(ynTrade));
        }
		
		List<Partner> list = select().from(qPartner).where(builder).orderBy(qPartner.noPartner.desc()).fetch();

        return list;
    }
}