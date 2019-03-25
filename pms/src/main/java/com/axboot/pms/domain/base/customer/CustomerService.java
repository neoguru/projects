package com.axboot.pms.domain.base.customer;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import com.axboot.pms.domain.base.customer.charge.CustomerCharge;
import com.axboot.pms.domain.base.customer.charge.CustomerChargeService;

import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.util.List;

@Service
public class CustomerService extends BaseService<Customer, Integer> {
    private CustomerRepository customerRepository;

    @Inject
    private CustomerChargeService customerChargeService;
    
    @Inject
    public CustomerService(CustomerRepository customerRepository) {
        super(customerRepository);
        this.customerRepository = customerRepository;
    }

    @Transactional
    public void saveCustomer(List<Customer> customers) throws Exception {
    	
    	if (isNotEmpty(customers)) {
    		
    		for (Customer customer : customers) {

    			save(customer);
    			
    			if (customer.getChargeListq() != null) {
    				
    				for (CustomerCharge cc : customer.getChargeListq()) {
    					if (cc.getNoCustomer() == null) {    	    				
    	    				cc.setNoCustomer(customer.getNoCustomer());
    					}
    				}
    				customerChargeService.save(customer.getChargeListq());
    			}
				
    		}
    	}
    }
    
    public List<Customer> gets(RequestParams<Customer> requestParams) {
    	
		String nmCustomer = requestParams.getString("headNmCustomer");
		String nmCeo = requestParams.getString("headNmCeo");
		String ynTrade = requestParams.getString("headYnTrade");

		BooleanBuilder builder = new BooleanBuilder();        

		if (isNotEmpty(nmCustomer)){
  	 		builder.and(qCustomer.nmCustomer.like(Expressions.asString("%").concat(nmCustomer).concat("%")));
        }

		if (isNotEmpty(nmCeo)){
  	 		builder.and(qCustomer.nmCeo.like(Expressions.asString("%").concat(nmCeo).concat("%")));
        }

		if (isNotEmpty(ynTrade)){
            builder.and(qCustomer.ynTrade.eq(ynTrade));
        }
		
		List<Customer> list = select().from(qCustomer).where(builder).orderBy(qCustomer.noCustomer.desc()).fetch();

        return list;
    }
}