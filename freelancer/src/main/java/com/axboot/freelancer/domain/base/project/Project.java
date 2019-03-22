package com.axboot.freelancer.domain.base.project;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;

import java.time.LocalDate;

import javax.persistence.*;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "project")
@Comment(value = "")
@Alias("project")
public class Project extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noProject;

	@Column(name = "NM_PROJECT", length = 100, nullable = false)
	@Comment(value = "프로젝트명")
	@ColumnPosition(3)
	private String nmProject;

	@Column(name = "NM_CUSTOMER", length = 50, nullable = false)
	@Comment(value = "고객명")
	@ColumnPosition(5)
	private String nmCustomer;

	@Column(name = "DT_START", nullable = false)
	@Comment(value = "프로젝트 시작일자")
	@ColumnPosition(7)
	private LocalDate dtStart;

	@Column(name = "DURATION", length = 50, nullable = false)
	@Comment(value = "프로젝트 기간")
	@ColumnPosition(9)
	private String duration;

	@Column(name = "PLACE", length = 50, nullable = false)
	@Comment(value = "프로젝트 장소")
	@ColumnPosition(11)
	private String place;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(13)
	private String remark;


    @Override
    public Integer getId() {
        return noProject;
    }
}