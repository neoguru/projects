package com.axboot.freelancer.domain.base.developer.dev.uitool;

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
@Table(name = "developer_dev_uitool")
@Comment(value = "")
@Alias("developerDevUitool")
public class DeveloperDevUitool extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_UI", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noUi;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "UI_TOOL", length = 50, nullable = false)
	@Comment(value = "경험사업영역")
	@ColumnPosition(5)
	private String uiTool;


    @Override
    public Integer getId() {
        return noUi;
    }
}