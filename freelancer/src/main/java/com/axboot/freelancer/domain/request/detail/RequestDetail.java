package com.axboot.freelancer.domain.request.detail;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "request_detail")
@Comment(value = "")
@Alias("requestDetail")
public class RequestDetail extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_DETAIL", precision = 10, nullable = false)
	@Comment(value = "요청상세번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noDetail;

	@Column(name = "NO_REQUEST", precision = 10, nullable = false)
	@Comment(value = "요청번호")
	private Integer noRequest;

	@Column(name = "GRADE", length = 50, nullable = false)
	@Comment(value = "요청등급")
	private String grade;

	@Column(name = "TASK", length = 50, nullable = false)
	@Comment(value = "요청업무(분석/설계/개발/운영)")
	private String task;

	@Column(name = "HEAD_COUNT", length = 3, nullable = false)
	@Comment(value = "요청인원")
	private String headCount;

	@Column(name = "COST", precision = 10, nullable = false)
	@Comment(value = "요청단가")
	private Integer cost;

	@Column(name = "DT_START", nullable = false)
	@Comment(value = "투입예정일")
	private LocalDate dtStart;

	@Column(name = "DT_END", nullable = false)
	@Comment(value = "종료예정일")
	private LocalDate dtEnd;

	@Column(name = "INPUT_MM", precision = 4, scale = 2, nullable = false)
	@Comment(value = "예정투입공수")
	private BigDecimal inputMm;

	@Column(name = "YN_FINISH", length = 1, nullable = false)
	@Comment(value = "요청종료여부")
	private String ynFinish;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noDetail;
    }
}