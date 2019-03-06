package com.axboot.freelancer.domain.apply;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "apply")
@Comment(value = "")
@Alias("apply")
public class Apply extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_APPLY", precision = 10, nullable = false)
	@Comment(value = "지원번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noApply;

	@Column(name = "NO_DETAIL", precision = 10, nullable = false)
	@Comment(value = "요청상세번호")
	private Integer noDetail;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	private Integer noDeveloper;

	@Column(name = "TYPE_DEVELOPER", length = 50, nullable = false)
	@Comment(value = "개발자구분(정규직/반정규직/프리랜서/업체소속)")
	private String typeDeveloper;

	@Column(name = "DVL_PARTNER", precision = 10)
	@Comment(value = "개발자소속업체")
	private Integer dvlPartner;

	@Column(name = "APPLY_COST", precision = 10, nullable = false)
	@Comment(value = "지원단가")
	private Integer applyCost;

	@Column(name = "DVL_COST", precision = 10)
	@Comment(value = "개발자요청단가")
	private Integer dvlCost;

	@Column(name = "DT_APPLY", nullable = false)
	@Comment(value = "지원일자")
	private LocalDate dtApply;

	@Column(name = "DT_INTERVIEW")
	@Comment(value = "인터뷰일자")
	private LocalDateTime dtInterview;

	@Column(name = "YN_ACCEPTED", length = 1)
	@Comment(value = "합격여부")
	private String ynAccepted;

	@Column(name = "REJECT_REASON", length = 255)
	@Comment(value = "불합격사유")
	private String rejectReason;

	@Column(name = "YN_AGREE", length = 1)
	@Comment(value = "합류합의여부")
	private String ynAgree;

	@Column(name = "BREAKDOWN_REASON", length = 255)
	@Comment(value = "결렬사유")
	private String breakdownReason;

	@Column(name = "TRANSMIT", length = 1, nullable = false)
	@Comment(value = "계약전송")
	private String transmit;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noApply;
    }
}