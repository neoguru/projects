package com.axboot.freelancer.domain.base.developer.history;

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
@Table(name = "developer_history")
@Comment(value = "")
@Alias("developerHistory")
public class DeveloperHistory extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_HISTORY", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noHistory;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "NO_DETAIL", precision = 10, nullable = false)
	@Comment(value = "매출계약상세 번호")
	@ColumnPosition(5)
	private Integer noDetail;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(7)
	private String remark;

    @Override
    public Integer getId() {
        return noHistory;
    }
}