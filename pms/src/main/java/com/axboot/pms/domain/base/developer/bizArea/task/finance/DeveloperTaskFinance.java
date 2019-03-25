package com.axboot.pms.domain.base.developer.bizArea.task.finance;

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
@Table(name = "developer_task_finance")
@Comment(value = "개발자 업종별 경험업무 테이블(금융업종)")
@Alias("developerTaskFinance")
public class DeveloperTaskFinance extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_TASK", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noTask;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "FINANCE_TASK", length = 50, nullable = false)
	@Comment(value = "경험업무")
	@ColumnPosition(5)
	private String financeTask;


    @Override
    public Integer getId() {
        return noTask;
    }
}