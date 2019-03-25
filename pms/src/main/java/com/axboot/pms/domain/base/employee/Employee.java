package com.axboot.pms.domain.base.employee;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "employee")
@Comment(value = "사원마스터 테이블")
@Alias("employee")
public class Employee extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_EMPLOYEE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noEmployee;

	@Column(name = "NM_EMPLOYEE", length = 20, nullable = false)
	@Comment(value = "사원명")
	@ColumnPosition(3)
	private String nmEmployee;

	@Column(name = "DT_BIRTH", nullable = false)
	@Comment(value = "생년월일")
	@ColumnPosition(5)
	private LocalDate dtBirth;

	@Column(name = "GENDER", length = 10, nullable = false)
	@Comment(value = "성별")
	@ColumnPosition(7)
	private String gender;

	@Column(name = "DT_JOIN", nullable = false)
	@Comment(value = "입사일자")
	@ColumnPosition(9)
	private LocalDate dtJoin;

	@Column(name = "NO_MOBILE", length = 20)
	@Comment(value = "휴대폰번호")
	@ColumnPosition(11)
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일")
	@ColumnPosition(13)
	private String email;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	@ColumnPosition(15)
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "주소")
	@ColumnPosition(17)
	private String address;

	@Column(name = "YN_INVOLVED", length = 20, nullable = false)
	@Comment(value = "프로젝트 참여여부(현재)")
	@ColumnPosition(19)
	private String ynInvolved;

	@Column(name = "YN_RETIRE", length = 20, nullable = false)
	@Comment(value = "퇴사여부")
	@ColumnPosition(21)
	private String ynRetire;

	@Column(name = "DT_RETIRE")
	@Comment(value = "퇴사일자")
	@ColumnPosition(23)
	private LocalDate dtRetire;

	@Column(name = "NO_DEVELOPER", precision = 10)
	@Comment(value = "개발자번호")
	@ColumnPosition(25)
	private Integer noDeveloper;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(27)
	private String remark;


    @Override
    public Integer getId() {
        return noEmployee;
    }
}