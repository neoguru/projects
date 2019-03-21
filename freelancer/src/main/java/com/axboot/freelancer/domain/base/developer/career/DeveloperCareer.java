package com.axboot.freelancer.domain.base.developer.career;

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
@Table(name = "developer_career")
@Comment(value = "개발자 경력 테이블")
@Alias("developerCareer")
public class DeveloperCareer extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_CAREER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noCareer;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "NM_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트명")
	@ColumnPosition(5)
	private Integer nmProject;

	@Column(name = "PERIOD", length = 50)
	@Comment(value = "참여기간")
	@ColumnPosition(7)
	private String period;

	@Column(name = "NM_CUSTOMER", length = 50)
	@Comment(value = "고객명")
	@ColumnPosition(9)
	private String nmCustomer;

	@Column(name = "NM_PARTNER", length = 50)
	@Comment(value = "근무회사")
	@ColumnPosition(11)
	private String nmPartner;

	@Column(name = "ROLE", length = 50)
	@Comment(value = "역할")
	@ColumnPosition(13)
	private String role;

	@Column(name = "DEV_LANG", length = 50)
	@Comment(value = "개발언어")
	@ColumnPosition(15)
	private String devLang;

	@Column(name = "DBMS", length = 50)
	@Comment(value = "DBMS")
	@ColumnPosition(17)
	private String dbms;

	@Column(name = "TOOL", length = 50)
	@Comment(value = "개발TOOL")
	@ColumnPosition(19)
	private String tool;

	@Column(name = "FRAMEWORK", length = 50)
	@Comment(value = "개발FRAMEWORK")
	@ColumnPosition(21)
	private String framework;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(23)
	private String remark;


    @Override
    public Integer getId() {
        return noCareer;
    }
}