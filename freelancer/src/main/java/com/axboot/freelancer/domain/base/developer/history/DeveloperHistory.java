package com.axboot.freelancer.domain.base.developer.history;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.SimpleJpaModel;
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
public class DeveloperHistory extends SimpleJpaModel<Integer> {

	@Id
	@Column(name = "NO_HISTORY", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noHistory;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	private Integer noDeveloper;

	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트번호")
	private Integer noProject;

	@Column(name = "TYPE_DEVELOPER", length = 20, nullable = false)
	@Comment(value = "개발자유형(계약직, 프리랜서, 업체소속)")
	private String typeDeveloper;

	@Column(name = "NO_PARTNER", precision = 10)
	@Comment(value = "소속거래처번호")
	private Integer noPartner;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noHistory;
    }
}