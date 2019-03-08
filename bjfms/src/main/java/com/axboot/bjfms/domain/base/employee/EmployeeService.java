package com.axboot.bjfms.domain.base.employee;

import com.axboot.bjfms.domain.BaseService;
import com.axboot.bjfms.domain.base.employee.gen.NoEmployeeGen;
import com.axboot.bjfms.domain.base.employee.gen.NoEmployeeGenService;
import com.axboot.bjfms.domain.base.employee.gen.NoWorkerGen;
import com.axboot.bjfms.domain.base.employee.gen.NoWorkerGenService;
import com.axboot.bjfms.domain.user.UserService;
import com.axboot.bjfms.utils.SessionUtils;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class EmployeeService extends BaseService<Employee, Integer> {
	
    private EmployeeRepository employeeRepository;

    @Inject
    private UserService userService;

    @Inject
    private NoEmployeeGenService noEmployeeGenService;

    @Inject
    private NoWorkerGenService noWorkerGenService;

    @Inject
    public EmployeeService(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }

    @Transactional
//  public void saveEmployee(List<Employee> employees) throws Exception {
    public void saveEmployee(Employee employee) throws Exception {

    	if (employee.getNoEmployee() == null) {
			if(employee.getYnWorkplace().equals("Y")){
    			NoWorkerGen noWorkerGen = new NoWorkerGen();
    			noWorkerGenService.save(noWorkerGen);            			
    			employee.setNoEmployee(noWorkerGen.getSeq());     	
			} else {
    			NoEmployeeGen noEmployeeGen = new NoEmployeeGen();
    			noEmployeeGenService.save(noEmployeeGen);
    			employee.setNoEmployee(noEmployeeGen.getSeq());
			}
    	}
		save(employee);
    }

    public Employee getEmployeeByNoEmp(Integer noEmployee){

//        return employeeRepository.getOne(noEmployee);

        return employeeRepository.findOne(noEmployee);
    	//Employee emp = employeeRepository.findByNoEmployee(noEmployee);
    	//return emp;
    }
    
    public Employee getEmployee(RequestParams requestParams) {
    	/*
        Employee employee = gets(requestParams).stream().findAny().orElse(null);

       if (employee != null) {      
        	employee.setUser(userService.getUserByNoEmployee(employee.getNoEmployee()));
        	employee.setEmployeeWorkplaceList(workplaceEmployeeService.gets(requestParams));
        } 
        return employee;
        */
        
   	 	Integer noEmployee = requestParams.getInt("noEmployee");
   	 	Employee employee = employeeRepository.getOne(noEmployee);

        if (employee != null) {      
         	employee.setUser(userService.getUserByNoEmployee(noEmployee));
//         	employee.setEmployeeWorkplaceList(workplaceEmployeeService.gets(requestParams));		//--> javascript에서 따로 search
         } 
		
        return employee;
    	
    }

    public List<Employee> gets(RequestParams requestParams) {
 //       return findAll();
//    	String authGroup = SessionUtils.getCurrentUser().getAuthGroupList().get(0);
    	
   	 	Integer noEmployee = requestParams.getInt("noEmployee");
   	 	Integer headNoDepartment = requestParams.getInt("headNoDepartment");
   	 	String headYnRetire = requestParams.getString("headYnRetire");
        String headNmEmployee = requestParams.getString("headNmEmployee");
        String headNoRegist = requestParams.getString("headNoRegist");
        String ynWorkplace = requestParams.getString("ynWorkplace");
        
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
       if (isNotEmpty(headNoRegist)){
           builder.and(qEmployee.noRegist.like(Expressions.asString("%").concat(headNoRegist).concat("%")));
       }  
       if (ynWorkplace.equals("Y")) {
           builder.and(qEmployee.ynWorkplace.eq(ynWorkplace));
       }  
       
       List<Employee> list = new ArrayList<Employee>();
       
       if (ynWorkplace.equals("Y")) {
           list = select().from(qEmployee).where(builder).orderBy(qEmployee.noEmployee.desc()).fetch();
       } else {
           list = select().from(qEmployee).where(builder).orderBy(qEmployee.noEmployee.asc()).fetch();
       }

//       List<Employee> list = select().from(qEmployee).where(builder).orderBy(qEmployee.noEmployee.asc()).fetch();
/*
       for (Employee emp : list){  
  	   		emp.setUser(userService.getUserByNoEmployee(emp.getNoEmployee())); 	
       }
      
       // 로그인 권한보다 상위의 권한을 list에서 제거
       Iterator<Employee> iter = list.iterator();
       
       switch (authGroup) {
       		case "S0001" :
       			break;
       		case "S0002" :
       			
       			while (iter.hasNext()) {       				
       				Employee emp = iter.next();
       				
       				if (emp.getUser() != null) {
           				if (emp.getUser().getAuthList().get(0).getGrpAuthCd().equals("S0001")) {
           					iter.remove();
           				}
       				}
       			 
       			}
       			break;
       		case "S0003" :
       		case "S0004" :
       		case "S0005" :
       			
       			while (iter.hasNext()) {       				
       				Employee emp = iter.next();
       			 
       				if (emp.getUser() != null) {
           				if (emp.getUser().getAuthList().get(0).getGrpAuthCd().equals("S0001") ||
              					 emp.getUser().getAuthList().get(0).getGrpAuthCd().equals("S0002") 	) {
              					iter.remove();
              			}
       				}
       			}
       			break;
	   
       }
*/       
       return list;        
    }
}
