package com.axboot.bjfms.domain.base.scheduler.repeat;

import com.axboot.bjfms.domain.BaseJpaModel;
import com.axboot.bjfms.domain.base.scheduler.Scheduler;
import com.axboot.bjfms.domain.base.scheduler.repeat.change.SchedulerRepeatChange;

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
@Table(name = "SCHEDULER_REPEAT")
@Comment(value = "")
@Alias("schedulerRepeat")
public class SchedulerRepeat extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_SCHEDULE", precision = 10, nullable = false)
	@Comment(value = "스케줄번호")
    @ColumnPosition(1)
	private Integer noSchedule;

	@Column(name = "REPEAT_CYCLE", length = 50, nullable = false)
	@Comment(value = "반복주기(일,주,월,년)")
    @ColumnPosition(3)
	private String repeatCycle;

	@Column(name = "GAP", precision = 3, nullable = false)
	@Comment(value = "간격")
    @ColumnPosition(5)
	private Integer gap;

	@Column(name = "DAY_DATE", length = 50)
	@Comment(value = "요일/날짜 기준(월, 년별시 적용)")
    @ColumnPosition(7)
	private String dayDate;

	@Column(name = "DAY", precision = 3)
	@Comment(value = "요일(0 ~ 6)")
    @ColumnPosition(9)
	private Integer day;

	@Column(name = "DAY_COUNT", length = 10)
	@Comment(value = "요일횟수")
    @ColumnPosition(11)
	private String dayCount;

	@Column(name = "DATE", length = 10)
	@Comment(value = "날짜 (1~31, 말일)")
    @ColumnPosition(13)
	private String date;

	@Column(name = "MONTH", precision = 3)
	@Comment(value = "월(0~11)")
    @ColumnPosition(15)
	private Integer month;

	@Column(name = "REPEAT_END", length = 50, nullable = false)
	@Comment(value = "반복종료기준")
    @ColumnPosition(17)
	private String repeatEnd;

	@Column(name = "REPEAT_COUNT", precision = 3)
	@Comment(value = "반복횟수")
    @ColumnPosition(18)
	private Integer repeatCount;

	@Column(name = "DT_END_REPEAT", nullable = false)
	@Comment(value = "반복 종료일")
    @ColumnPosition(19)
	private LocalDate dtEndRepeat;

	@OneToOne
	@JoinColumn(name="NO_SCHEDULE", referencedColumnName = "NO_SCHEDULE", insertable = false, updatable = false)
	private Scheduler scheduler;

	@OneToMany
	@JoinColumn(name="NO_SCHEDULE", referencedColumnName = "NO_SCHEDULE", nullable = true, insertable = false, updatable = false)
	private List<SchedulerRepeatChange> changeList;


    @Override
    public Integer getId() {
        return noSchedule;
    }
}