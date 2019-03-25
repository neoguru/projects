package com.axboot.pms.domain.base.developer.bizArea.finance;

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
@Table(name = "developer_biz_finance")
@Comment(value = "개발자 업종세부영역(기업)")
@Alias("developerBizFinance")
public class DeveloperBizFinance extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_FINANCE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noFinance;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "FINANCE_AREA", length = 50, nullable = false)
	@Comment(value = "경험사업영역상세")
	@ColumnPosition(5)
	private String financeArea;


    @Override
    public Integer getId() {
        return noFinance;
    }
}