package com.axboot.pms.domain.assign.schedule;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
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
@Table(name = "assign_schedule")
@Comment(value = "배치인력 지급 스케줄 테이블")
@Alias("assignSchedule")
public class AssignSchedule extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_SCHEDULE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noSchedule;

	@Column(name = "NO_ASSIGN", precision = 10, nullable = false)
	@Comment(value = "")
	@ColumnPosition(3)
	private Integer noAssign;

	@Column(name = "DT_SCHEDULE", nullable = false)
	@Comment(value = "지급스케줄 일자")
	@ColumnPosition(5)
	private LocalDate dtSchedule;

	@Column(name = "MM_SCHEDULE", precision = 4, scale = 2, nullable = false)
	@Comment(value = "지급스케줄 공수")
	@ColumnPosition(7)
	private BigDecimal mmSchedule;

	@Column(name = "AMOUNT_SCHEDULE", precision = 19, nullable = false)
	@Comment(value = "지급스케줄 금액")
	@ColumnPosition(9)
	private Long amountSchedule;

	@Column(name = "TAX_SCHEDULE", precision = 19, nullable = false)
	@Comment(value = "지급스케줄 세금")
	@ColumnPosition(11)
	private Long taxSchedule;

	@Column(name = "PAYMENT_SCHEDULE", precision = 19, nullable = false)
	@Comment(value = "지급스케줄 지급금액")
	@ColumnPosition(13)
	private Long paymentSchedule;

	@Column(name = "YN_PAYMENT", length = 1, nullable = false)
	@Comment(value = "지급여부")
	@ColumnPosition(15)
	private String ynPayment;

	@Column(name = "DT_PAYMENT")
	@Comment(value = "지급일자")
	@ColumnPosition(17)
	private LocalDate dtPayment;

	@Column(name = "PAYMENT_AMOUNT", precision = 19)
	@Comment(value = "지급금액")
	@ColumnPosition(19)
	private Long paymentAmount;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(21)
	private String remark;


    @Override
    public Integer getId() {
        return noSchedule;
    }
}