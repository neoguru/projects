package com.axboot.ozpms.domain.scheduler.repeat.change;

import com.axboot.ozpms.domain.BaseJpaModel;
import com.axboot.ozpms.domain.scheduler.repeat.SchedulerRepeat;

import com.chequer.axboot.core.annotations.ColumnPosition;

import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "SCHEDULER_REPEAT_CHANGE")
@Comment(value = "")
@Alias("schedulerRepeatChange")
public class SchedulerRepeatChange extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_CHANGE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer noChange;

	@Column(name = "NO_SCHEDULE", precision = 10, nullable = false)
	@Comment(value = "스케줄번호")
    @ColumnPosition(3)
	private Integer noSchedule;

	@Column(name = "ORIGINAL_START", nullable = false)
	@Comment(value = "변경전 시작일자")
    @ColumnPosition(5)
	private LocalDate originalStart;

	@Column(name = "TYPE_CHANGE", length = 50, nullable = false)
	@Comment(value = "변경구분")
    @ColumnPosition(6)
	private String typeChange;
	
	@Column(name = "START", nullable = false)
	@Comment(value = "시작일자")
    @ColumnPosition(7)
	private LocalDate start;

	@Column(name = "TM_START")
	@Comment(value = "시작시간")
    @ColumnPosition(9)
	private LocalTime tmStart;

	@Column(name = "END", nullable = false)
	@Comment(value = "종료일자")
    @ColumnPosition(11)
	private LocalDate end;

	@Column(name = "TM_END")
	@Comment(value = "종료시간")
    @ColumnPosition(13)
	private LocalTime tmEnd;

	@Column(name = "ALL_DAY", length = 1, columnDefinition = "BIT(1)", nullable = false)
	@Comment(value = "종일여부")
    @ColumnPosition(15)
	private Boolean allDay;

	@Column(name = "MEMO", length = 65535)
	@Comment(value = "")
    @ColumnPosition(17)
	private String memo;
/*
	@ManyToOne
	@JoinColumn(name="NO_SCHEDULE", referencedColumnName = "NO_SCHEDULE", insertable = false, updatable = false)
	private SchedulerRepeat repeatScheduler;
*/

    @Override
    public Integer getId() {
        return noChange;
    }
}
