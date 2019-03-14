package com.axboot.freelancer.domain.base.developer;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import com.axboot.freelancer.domain.base.developer.history.DeveloperHistory;

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
@Comment(value = "")
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

	@Column(name = "NO_REGIST", length = 20)
	@Comment(value = "주민등록번호")
	@ColumnPosition(5)
	private String noRegist;

	@Column(name = "DT_JOIN", nullable = false)
	@Comment(value = "최초등록일")
	@ColumnPosition(7)
	private LocalDate dtJoin;

	@Column(name = "NO_MOBILE", length = 20)
	@Comment(value = "휴대폰번호")
	@ColumnPosition(9)
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일주소")
	@ColumnPosition(11)
	private String email;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	@ColumnPosition(13)
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "집주소")
	@ColumnPosition(15)
	private String address;

	@Column(name = "YN_INVOLVED", length = 1, nullable = false)
	@Comment(value = "프로젝트 참여여부(현재)")
	@ColumnPosition(17)
	private String ynInvolved;

	@Column(name = "YN_CAREER", length = 1, nullable = false)
	@Comment(value = "경력증빙가능여부")
	@ColumnPosition(19)
	private String ynCareer;

	@Column(name = "YN_LICENSE", length = 1, nullable = false)
	@Comment(value = "자격증보유여부")
	@ColumnPosition(21)
	private String ynLicense;

	@Column(name = "NM_LICENSE", length = 1, nullable = false)
	@Comment(value = "자격증명")
	@ColumnPosition(23)
	private String nmLicense;

	@Column(name = "YN_ENTERPRISE", length = 1, nullable = false)
	@Comment(value = "기업경험여부")
	@ColumnPosition(25)
	private String ynEnterprise;

	@Column(name = "YN_FINANCE", length = 1, nullable = false)
	@Comment(value = "금융경험여부")
	@ColumnPosition(27)
	private String ynFinance;

	@Column(name = "YN_PUBLIC", length = 1, nullable = false)
	@Comment(value = "공공경험여부")
	@ColumnPosition(29)
	private String ynPublic;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(19)
	private String remark;

	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="NO_DEVELOPER", referencedColumnName = "NO_DEVELOPER", insertable = false, updatable = false)
	private List<DeveloperHistory> developerHistoryList;
	

    @Override
    public Integer getId() {
        return noDeveloper;
    }
}