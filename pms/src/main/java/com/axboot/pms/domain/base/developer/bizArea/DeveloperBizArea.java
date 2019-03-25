package com.axboot.pms.domain.base.developer.bizArea;

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
@Table(name = "developer_biz_area")
@Comment(value = "개발자 경험업종 테이블")
@Alias("developerBizArea")
public class DeveloperBizArea extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_AREA", precision = 10, nullable = false)
	@Comment(value = "개발자사업영역 번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noArea;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "BIZ_AREA", length = 50, nullable = false)
	@Comment(value = "경험사업영역")
	@ColumnPosition(5)
	private String bizArea;


    @Override
    public Integer getId() {
        return noArea;
    }
}