package com.axboot.elancer.domain.scheduler;

import com.axboot.elancer.domain.BaseJpaModel;
import com.axboot.elancer.domain.scheduler.repeat.SchedulerRepeat;

import com.chequer.axboot.core.annotations.ColumnPosition;
import lombok.*;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "SCHEDULER")
@Comment(value = "")
@Alias("scheduler")
public class Scheduler extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_SCHEDULE", precision = 10, nullable = false)
	@Comment(value = "스케줄번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer noSchedule;

	@Column(name = "NO_EMPLOYEE", precision = 10, nullable = false)
	@Comment(value = "사원번호")
    @ColumnPosition(3)
	private Integer noEmployee;

	@Column(name = "TITLE", length = 50, nullable = false)
	@Comment(value = "제목")
    @ColumnPosition(5)
	private String title;

	@Column(name = "START", nullable = false)
	@Comment(value = "시작일자")
    @ColumnPosition(7)
	private LocalDate start;

	@Column(name = "TM_START")
	@Comment(value = "시작시간")
    @ColumnPosition(8)
	private LocalTime tmStart;

	@Column(name = "END", nullable = false)
	@Comment(value = "종료일자")
    @ColumnPosition(9)
	private LocalDate end;

	@Column(name = "TM_END")
	@Comment(value = "종료시간")
    @ColumnPosition(10)
	private LocalTime tmEnd;
/*
	@Column(name = "ALL_DAY", length = 10, nullable = false)
	@Comment(value = "종일여부")
    @ColumnPosition(11)
	private String allDay;
*/
	@Column(name = "ALL_DAY", length = 1, columnDefinition = "BIT(1)", nullable = false)
	@Comment(value = "종일여부")
    @ColumnPosition(11)
	private Boolean allDay;

	@Column(name = "YN_REPEAT", length = 10, nullable = false)
	@Comment(value = "반복여부")
    @ColumnPosition(13)
	private String ynRepeat;

	@Column(name = "MEMO", length = 65535)
	@Comment(value = "스케줄 메모")
    @ColumnPosition(15)
	private String memo;
/*
	@OneToOne
	@JoinColumn(name="NO_SCHEDULE", referencedColumnName = "NO_SCHEDULE", nullable = true, insertable = false, updatable = false)
	private SchedulerRepeat schedulerRepeat;
*/
    @Transient
	private SchedulerRepeat repeatSave;

    @Override
    public Integer getId() {
        return noSchedule;
    }
}