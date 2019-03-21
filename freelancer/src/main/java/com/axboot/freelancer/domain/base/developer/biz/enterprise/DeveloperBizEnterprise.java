package com.axboot.freelancer.domain.base.developer.biz.enterprise;

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
@Table(name = "developer_biz_enterprise")
@Comment(value = "")
@Alias("developerBizEnterprise")
public class DeveloperBizEnterprise extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_ENTERPRISE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noEnterprise;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "ENTERPRISE_AREA", length = 50, nullable = false)
	@Comment(value = "경험사업영역상세")
	@ColumnPosition(5)
	private String enterpriseArea;


    @Override
    public Integer getId() {
        return noEnterprise;
    }
}