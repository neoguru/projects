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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer noEmployee;

	@Column(name = "NM_EMPLOYEE", length = 20, nullable = false)
	@Comment(value = "사원명")
    @ColumnPosition(3)
	private String nmEmployee;

	@Column(name = "DT_BIRTH")
	@Comment(value = "생년월일")
    @ColumnPosition(5)
	private LocalDate dtBirth;

	@Column(name = "SEX", length = 10)
	@Comment(value = "성별")
    @ColumnPosition(7)
	private String sex;

	@Column(name = "NO_REGIST", length = 20)
	@Comment(value = "주민등록번호")
    @ColumnPosition(9)
	private String noRegist;

	@Column(name = "NO_DEPARTMENT", precision = 10, nullable = false)
	@Comment(value = "소속부서번호")
    @ColumnPosition(11)
	private Integer noDepartment;

	@Column(name = "CD_POSITION", length = 50)
	@Comment(value = "직책")
    @ColumnPosition(13)
	private String cdPosition;

	@Column(name = "DT_JOIN")
	@Comment(value = "입사일자")
    @ColumnPosition(15)
	private LocalDate dtJoin;

	@Column(name = "YN_RETIRE", length = 10, nullable = false)
	@Comment(value = "퇴사여부")
    @ColumnPosition(17)
	private String ynRetire;

	@Column(name = "DT_RETIRE")
	@Comment(value = "퇴사일자")
    @ColumnPosition(19)
	private LocalDate dtRetire;

	@Column(name = "NO_MOBILE", length = 20, nullable = false)
	@Comment(value = "휴대전호번호")
    @ColumnPosition(21)
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일주소")
    @ColumnPosition(23)
	private String email;

	@Column(name = "NO_TEL_HOME", length = 20)
	@Comment(value = "집전화번호")
    @ColumnPosition(25)
	private String noTelHome;

	@Column(name = "ZIP_HOME", length = 10)
	@Comment(value = "우편번호(집)")
    @ColumnPosition(27)
	private String zipHome;

	@Column(name = "ADDRESS_HOME", length = 100)
	@Comment(value = "주소(집)")
    @ColumnPosition(29)
	private String addressHome;

	@Column(name = "ZIP_OTHER", length = 10)
	@Comment(value = "우편번호(기타)")
    @ColumnPosition(31)
	private String zipOther;

	@Column(name = "ADDRESS_OTHER", length = 100)
	@Comment(value = "주소(기타)")
    @ColumnPosition(33)
	private String addressOther;

	@ManyToOne
	@JoinColumn(name="NO_DEPARTMENT", referencedColumnName = "NO_DEPARTMENT", insertable = false, updatable = false)
	private Department department;

/*
	@OneToOne
	@JoinColumn(name="NO_EMPLOYEE", referencedColumnName = "NO_EMPLOYEE", nullable = true, insertable = false, updatable = false)
	private User user;
*/
    @Transient
	private User user;

	
    @Override
    public Integer getId() {
        return noEmployee;
    }
}
