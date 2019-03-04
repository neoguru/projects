package com.axboot.bjfms.domain.base.employee;

import com.axboot.bjfms.domain.BaseService;
import com.axboot.bjfms.domain.user.UserService;
import com.axboot.bjfms.utils.SessionUtils;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

@Service
public class EmployeeService extends BaseService<Employee, Integer> {
	
    private EmployeeRepository employeeRepository;

    @Inject
    private UserService userService;

    @Inject
    public EmployeeService(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public void saveEmployee(List<Employee> employees) throws Exception {
    	
    	if (isNotEmpty(employees)) {
    		
    		for (Employee emp : employees) {

    	    	save(emp);

    		}
    	}  	
    	
    }

    public Employee getEmployee(RequestParams requestParams) {
    	
        Employee employee = gets(requestParams).stream().findAny().orElse(null);
        
        if (employee != null) {   
//            employee.setFpcodeList(employeeFpcodeService.gets(requestParams));
//            employee.setEducationList(employeeEducationService.gets(requestParams));
//            employee.setSuretyList(employeeSuretyService.gets(requestParams));
//            employee.setPointList(employeePointUseService.gets(requestParams));
        }

        return employee;
    }

    public List<Employee> gets(RequestParams requestParams) {
 //       return findAll();
    	String authGroup = SessionUtils.getCurrentUser().getAuthGroupList().get(0);
    	
   	 	Integer noEmployee = requestParams.getInt("noEmployee");
   	 	Integer headNoDepartment = requestParams.getInt("headNoDepartment");
   	 	String headYnRetire = requestParams.getString("headYnRetire");
       String headNmEmployee = requestParams.getString("headNmEmployee");
       
       String filter = requestParams.getString("filter");

       BooleanBuilder builder = new BooleanBuilder();

       if (noEmployee > 0) {
           builder.and(qEmployee.noEmployee.eq(noEmployee));
       }
       if (headNoDepartment > 0){
           builder.and(qEmployee.noDepartment.eq(headNoDepartment));
       } 
       
       if (isNotEmpty(headYnRetire)){
           builder.and(qEmployee.ynRetire.eq(headYnRetire));
       }  
       if (isNotEmpty(headNmEmployee)){
           builder.and(qEmployee.nmEmployee.like(Expressions.asString("%").concat(headNmEmployee).concat("%")));
       }  

       List<Employee> list = select().from(qEmployee).where(builder).orderBy(qEmployee.ynRetire.asc() , qEmployee.noDepartment.asc() , qEmployee.noEmployee.desc()).fetch();

       for (Employee emp : list){  
  	   		emp.setUser(userService.getUserByNoEmployee(emp.getNoEmployee())); 	
      	
       }
              
       return list;        
    }
}
