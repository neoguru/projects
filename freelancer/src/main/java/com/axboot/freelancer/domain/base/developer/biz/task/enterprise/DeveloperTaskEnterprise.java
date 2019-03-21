package com.axboot.freelancer.domain.base.developer.biz.task.enterprise;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
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
@Table(name = "developer_task_enterprise")
@Comment(value = "")
@Alias("developerTaskEnterprise")
public class DeveloperTaskEnterprise extends BaseJpaModel<Integer> {

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

	@Column(name = "ENTERPRISE_TASK", length = 50, nullable = false)
	@Comment(value = "경험업무")
	@ColumnPosition(5)
	private String enterpriseTask;


    @Override
    public Integer getId() {
        return noTask;
    }
}