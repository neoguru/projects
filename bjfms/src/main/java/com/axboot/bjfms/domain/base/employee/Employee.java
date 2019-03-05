package com.axboot.bjfms.domain.base.employee;

import com.axboot.bjfms.domain.BaseJpaModel;
import com.axboot.bjfms.domain.base.department.Department;
import com.axboot.bjfms.domain.user.User;

import com.chequer.axboot.core.annotations.ColumnPosition;

import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "EMPLOYEE")
@Comment(value = "")
@Alias("employee")
public class Employee extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_EMPLOYEE", precision = 10, nullable = false)
	@Comment(value = "사원번호")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noEmployee;

	@Column(name = "NM_EMPLOYEE_KOR", length = 30, nullable = false)
	@Comment(value = "사원명(한글)")
	@ColumnPosition(2)
	private String nmEmployeeKor;

	@Column(name = "NM_EMPLOYEE_ENG", length = 30)
	@Comment(value = "사원명(영문)")
	@ColumnPosition(3)
	private String nmEmployeeEng;

	@Column(name = "NO_REGIST", length = 20, nullable = false)
	@Comment(value = "주민등록번호")
	@ColumnPosition(4)
	private String noRegist;

	@Column(name = "CD_GENDER", length = 1, nullable = false)
	@Comment(value = "성별")
	@ColumnPosition(5)
	private String cdGender;

	@Column(name = "NO_DEPARTMENT", precision = 10, nullable = false)
	@Comment(value = "소속부서")
	@ColumnPosition(6)
	private Integer noDepartment;

	@Column(name = "DT_JOIN")
	@Comment(value = "입사일자")
	@ColumnPosition(7)
	private LocalDate dtJoin;

	@Column(name = "CD_JOINTYPE", length = 50)
	@Comment(value = "입사구분")
	@ColumnPosition(8)
	private String cdJointype;

	@Column(name = "YN_RETIRE", length = 1, nullable = false)
	@Comment(value = "퇴사여부")
	@ColumnPosition(9)
	private String ynRetire;

	@Column(name = "DT_RETIRE")
	@Comment(value = "퇴사일자")
	@ColumnPosition(10)
	private LocalDate dtRetire;

	@Column(name = "CD_JOBGROUP", length = 50)
	@Comment(value = "직군코드")
	@ColumnPosition(11)
	private String cdJobgroup;

	@Column(name = "CD_JOBTYPE", length = 50)
	@Comment(value = "직종코드")
	@ColumnPosition(12)
	private String cdJobtype;

	@Column(name = "CD_WORKDIV", length = 50)
	@Comment(value = "공종코드")
	@ColumnPosition(13)
	private String cdWorkdiv;

	@Column(name = "CD_POSITION", length = 50)
	@Comment(value = "직위코드")
	@ColumnPosition(14)
	private String cdPosition;

	@Column(name = "YN_FOREIGN", length = 1)
	@Comment(value = "외국인여부")
	@ColumnPosition(15)
	private String ynForeign;

	@Column(name = "NM_NATION", length = 50)
	@Comment(value = "국적")
	@ColumnPosition(16)
	private String nmNation;

	@Column(name = "DAILY_COST", precision = 10)
	@Comment(value = "일단가")
	@ColumnPosition(17)
	private Integer dailyCost;

	@Column(name = "YN_TAX", length = 1)
	@Comment(value = "세금공제여부")
	@ColumnPosition(18)
	private String ynTax;

	@Column(name = "CD_BANK", length = 50)
	@Comment(value = "은행코드")
	@ColumnPosition(19)
	private String cdBank;

	@Column(name = "NO_ACCOUNT", length = 50)
	@Comment(value = "계좌번호")
	@ColumnPosition(20)
	private String noAccount;

	@Column(name = "NM_DEPOSITOR", length = 20)
	@Comment(value = "예금주명")
	@ColumnPosition(21)
	private String nmDepositor;

	@Column(name = "NO_MOBILE", length = 20, nullable = false)
	@Comment(value = "휴대폰")
	@ColumnPosition(22)
	private String noMobile;

	@Column(name = "NO_TEL", length = 20, nullable = false)
	@Comment(value = "전화번호")
	@ColumnPosition(23)
	private String noTel;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일")
	@ColumnPosition(24)
	private String email;

	@Column(name = "ZIP_HOME", length = 10)
	@Comment(value = "우편번호(집)")
	@ColumnPosition(25)
	private String zipHome;

	@Column(name = "ADDRESS_HOME", length = 100)
	@Comment(value = "주소(집)")
	@ColumnPosition(26)
	private String addressHome;

	@Column(name = "YN_WORKPLACE", length = 1, nullable = false)
	@Comment(value = "현장근로자여부")
	@ColumnPosition(27)
	private String ynWorkplace;

	@ManyToOne
	@JoinColumn(name="NO_DEPARTMENT", referencedColumnName = "NO_DEPARTMENT", insertable = false, updatable = false)
	private Department department;

/*
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="NO_EMPLOYEE", referencedColumnName = "NO_EMPLOYEE", insertable = false, updatable = false)
	private List<WorkplaceEmployee> employeeWorkplaceList;
	
	@Transient
	private List<WorkplaceEmployee> employeeWorkplaceList;
*/	
	@Transient
	private User user;

	
    @Override
    public Integer getId() {
        return noEmployee;
    }
}
