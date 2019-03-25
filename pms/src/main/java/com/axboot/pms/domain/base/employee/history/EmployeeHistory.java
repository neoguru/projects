package com.axboot.pms.domain.base.employee.history;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "employee_history")
@Comment(value = "사원 프로젝트 이력 테이블")
@Alias("employeeHistory")
public class EmployeeHistory extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_HISTORY", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noHistory;

	@Column(name = "NO_EMPLOYEE", precision = 10, nullable = false)
	@Comment(value = "사원번호")
	@ColumnPosition(3)
	private Integer noEmployee;

	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트번호")
	@ColumnPosition(5)
	private Integer noProject;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(7)
	private String remark;


    @Override
    public Integer getId() {
        return noHistory;
    }
}