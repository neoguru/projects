package com.axboot.pms.domain.base.project;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
import com.axboot.pms.domain.base.customer.Customer;
import com.axboot.pms.domain.base.partner.Partner;

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
@Table(name = "project")
@Comment(value = "프로젝트 마스터 테이블")
@Alias("project")
public class Project extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noProject;

	@Column(name = "NM_PROJECT", length = 255, nullable = false)
	@Comment(value = "프로젝트명")
	@ColumnPosition(3)
	private String nmProject;

	@Column(name = "NO_CUSTOMER", precision = 10, nullable = false)
	@Comment(value = "고객번호")
	@ColumnPosition(5)
	private Integer noCustomer;

	@Column(name = "NO_PARTNER_MAIN", precision = 10)
	@Comment(value = "주관사업자 번호")
	@ColumnPosition(7)
	private Integer noPartnerMain;

	@Column(name = "DT_START")
	@Comment(value = "시작일자")
	@ColumnPosition(9)
	private LocalDate dtStart;

	@Column(name = "DT_END")
	@Comment(value = "종료일자")
	@ColumnPosition(11)
	private LocalDate dtEnd;

	@Column(name = "AMOUNTT_OBTAIN", precision = 19)
	@Comment(value = "수주금액 (주관, 공동수급의 경우)")
	@ColumnPosition(13)
	private Long amounttObtain;

	@Column(name = "COMMON_COST", precision = 19)
	@Comment(value = "공통경비(공동수급경우 당사부담금(VAT포함))")
	@ColumnPosition(15)
	private Long commonCost;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(17)
	private String remark;

	@ManyToOne
	@JoinColumn(name="NO_CUSTOMER", referencedColumnName = "NO_CUSTOMER", insertable = false, updatable = false)
	private Customer customer;

	@ManyToOne
	@JoinColumn(name="NO_PARTNER_MAIN", referencedColumnName = "NO_PARTNER", nullable = true, insertable = false, updatable = false)
	private Partner partner;
	

    @Override
    public Integer getId() {
        return noProject;
    }
}