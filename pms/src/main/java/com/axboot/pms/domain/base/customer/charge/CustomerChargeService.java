package com.axboot.pms.domain.base.customer.charge;

import org.springframework.stereotype.Service;
import com.axboot.pms.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class CustomerChargeService extends BaseService<CustomerCharge, Integer> {
    private CustomerChargeRepository customerChargeRepository;

    @Inject
    public CustomerChargeService(CustomerChargeRepository customerChargeRepository) {
        super(customerChargeRepository);
        this.customerChargeRepository = customerChargeRepository;
    }

    public List<CustomerCharge> gets(RequestParams<CustomerCharge> requestParams) {
        return findAll();
    }
}