package com.axboot.pms.domain.assign.change;

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
@Table(name = "assign_change")
@Comment(value = "인력배치 변경 히스토리 테이블")
@Alias("assignChange")
public class AssignChange extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_CHANGE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noChange;

	@Column(name = "NO_ASSIGN", precision = 10, nullable = false)
	@Comment(value = "")
	@ColumnPosition(3)
	private Integer noAssign;

	@Column(name = "DT_CHANGE", nullable = false)
	@Comment(value = "변경일자")
	@ColumnPosition(5)
	private LocalDate dtChange;

	@Column(name = "TYPE_ASSIGN_CHANGE", length = 50, nullable = false)
	@Comment(value = "변경구분(투입기간변경, 소속변경, 역할,업무변경, 단가변경)")
	@ColumnPosition(7)
	private String typeAssignChange;

	@Column(name = "TYPE_DEVELOPER", length = 10, nullable = false)
	@Comment(value = "개발자구분(정규직,전문계약직,프리랜서,업체소속)")
	@ColumnPosition(9)
	private String typeDeveloper;

	@Column(name = "NO_PARTNER", precision = 10)
	@Comment(value = "개발자 소속업체")
	@ColumnPosition(11)
	private Integer noPartner;

	@Column(name = "PROJECT_ROLE", length = 10, nullable = false)
	@Comment(value = "프로젝트 담당역할(PM,PL,개발)")
	@ColumnPosition(13)
	private String projectRole;

	@Column(name = "PROJECT_TASK", length = 10, nullable = false)
	@Comment(value = "개발업무 영역(분석,설계,개발)")
	@ColumnPosition(15)
	private String projectTask;

	@Column(name = "DT_INPUT", nullable = false)
	@Comment(value = "투입일자")
	@ColumnPosition(17)
	private LocalDate dtInput;

	@Column(name = "DT_TARGET", nullable = false)
	@Comment(value = "철수예정일자")
	@ColumnPosition(19)
	private LocalDate dtTarget;

	@Column(name = "TARGET_MM", precision = 4, scale = 2, nullable = false)
	@Comment(value = "투입에정공수")
	@ColumnPosition(21)
	private BigDecimal targetMm;

	@Column(name = "COST_INPUT", precision = 10, nullable = false)
	@Comment(value = "투입단가")
	@ColumnPosition(23)
	private Integer costInput;

	@Column(name = "TYPE_ADJUST", length = 10, nullable = false)
	@Comment(value = "정산기준(말일, MM)")
	@ColumnPosition(25)
	private String typeAdjust;

	@Column(name = "TYPE_PAYMENT", length = 10, nullable = false)
	@Comment(value = "지급유형(10영업일, 특정일)")
	@ColumnPosition(27)
	private String typePayment;

	@Column(name = "DT_PAYMENT", length = 10, nullable = false)
	@Comment(value = "지급일")
	@ColumnPosition(29)
	private String dtPayment;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(31)
	private String remark;


    @Override
    public Integer getId() {
        return noChange;
    }
}