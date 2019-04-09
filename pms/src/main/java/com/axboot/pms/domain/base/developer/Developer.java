package com.axboot.pms.domain.base.developer;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
import com.axboot.pms.domain.base.developer.bizArea.DeveloperBizArea;
import com.axboot.pms.domain.base.developer.bizArea.enterprise.DeveloperBizEnterprise;
import com.axboot.pms.domain.base.developer.bizArea.finance.DeveloperBizFinance;
import com.axboot.pms.domain.base.developer.bizArea.task.enterprise.DeveloperTaskEnterprise;
import com.axboot.pms.domain.base.developer.bizArea.task.finance.DeveloperTaskFinance;
import com.axboot.pms.domain.base.developer.dev.db.DeveloperDevDb;
import com.axboot.pms.domain.base.developer.dev.frame.DeveloperDevFrame;
import com.axboot.pms.domain.base.developer.dev.lang.DeveloperDevLang;
import com.axboot.pms.domain.base.developer.dev.uitool.DeveloperDevUitool;
import com.axboot.pms.domain.base.developer.history.DeveloperHistory;

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
@Table(name = "developer")
@Comment(value = "개발자 마스터 테이블")
@Alias("developer")
public class Developer extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noDeveloper;

	@Column(name = "NM_DEVELOPER", length = 20, nullable = false)
	@Comment(value = "개발자명")
	@ColumnPosition(3)
	private String nmDeveloper;

	@Column(name = "TYPE_DEVELOPER", length = 10, nullable = false)
	@Comment(value = "개발자구분(정규직,전문계약직,프리랜서,업체소속)")
	@ColumnPosition(5)
	private String typeDeveloper;

	@Column(name = "NO_PARTNER", precision = 10)
	@Comment(value = "거래처번호")
	@ColumnPosition(7)
	private Integer noPartner;

	@Column(name = "DT_BIRTH")
	@Comment(value = "생년월일")
	@ColumnPosition(9)
	private LocalDate dtBirth;

	@Column(name = "GENDER", length =10)
	@Comment(value = "성별")
	@ColumnPosition(11)
	private String gender;

	@Column(name = "NO_REGIST", length = 20)
	@Comment(value = "주민등록번호")
	@ColumnPosition(13)
	private String noRegist;

	@Column(name = "DT_JOIN")
	@Comment(value = "정규직 입사일자")
	@ColumnPosition(15)
	private LocalDate dtJoin;

	@Column(name = "NO_DEPARTMENT", precision = 10)
	@Comment(value = "부서번호")
	@ColumnPosition(16)
	private Integer noDepartment;

	@Column(name = "YN_RETIRE", length = 1, nullable = false)
	@Comment(value = "정규직 퇴사여부")
	@ColumnPosition(17)
	private String ynRetire;

	@Column(name = "DT_RETIRE")
	@Comment(value = "정규직 퇴사일자")
	@ColumnPosition(19)
	private LocalDate dtRetire;

	@Column(name = "DT_CAREER", nullable = false)
	@Comment(value = "경력시작일")
	@ColumnPosition(21)
	private LocalDate dtCareer;

	@Column(name = "DEGREE", length = 20, nullable = false)
	@Comment(value = "최종학력")
	@ColumnPosition(23)
	private String degree;

	@Column(name = "YN_LICENSE", length = 1, nullable = false)
	@Comment(value = "자격증보유여부")
	@ColumnPosition(25)
	private String ynLicense;

	@Column(name = "NM_LICENSE", length = 100)
	@Comment(value = "자격증명")
	@ColumnPosition(27)
	private String nmLicense;

	@Column(name = "DT_LICENSE")
	@Comment(value = "자격증 취득일")
	@ColumnPosition(29)
	private LocalDate dtLicense;

	@Column(name = "YN_KOSA", length = 1, nullable = false)
	@Comment(value = "KOSA경력증빙여부")
	@ColumnPosition(31)
	private String ynKosa;

	@Column(name = "GRADE_KOSA", length = 10)
	@Comment(value = "KOSA등급")
	@ColumnPosition(33)
	private String gradeKosa;

	@Column(name = "DT_KOSA")
	@Comment(value = "KOSA취득일자")
	@ColumnPosition(35)
	private LocalDate dtKosa;

	@Column(name = "GRADE_COST", length = 10)
	@Comment(value = "원가등급")
	@ColumnPosition(37)
	private String gradeCost;

	@Column(name = "GRADE_CAREER", length = 10)
	@Comment(value = "경력기준등급")
	@ColumnPosition(39)
	private String gradeCareer;

	@Column(name = "CD_POSITION", length = 20)
	@Comment(value = "직급")
	@ColumnPosition(41)
	private String cdPosition;

	@Column(name = "NO_MOBILE", length = 20)
	@Comment(value = "휴대폰번호")
	@ColumnPosition(43)
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일주소")
	@ColumnPosition(45)
	private String email;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	@ColumnPosition(47)
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "집주소")
	@ColumnPosition(49)
	private String address;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(51)
	private String remark;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperBizArea> bizAreaList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperBizEnterprise> bizEnterpriseList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperBizFinance> bizFinanceList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperTaskEnterprise> taskEnterpriseList;
	
	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperTaskFinance> taskFinanceList;
	
	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperDevDb> devDbList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperDevFrame> devFrameList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperHistory> developerHistoryList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperDevLang> devLangList;

	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperDevUitool> devUitoolList;
/*
	@OneToMany
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", nullable = true,  insertable = false, updatable = false)
	private List<DeveloperContracted> devContList;
*/
    @Override
    public Integer getId() {
        return noDeveloper;
    }
}