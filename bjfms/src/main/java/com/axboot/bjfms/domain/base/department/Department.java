package com.axboot.bjfms.domain.base.department;

import com.axboot.bjfms.domain.BaseJpaModel;

import com.chequer.axboot.core.annotations.ColumnPosition;
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
@Table(name = "DEPARTMENT")
@Comment(value = "")
@Alias("department")
public class Department extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_DEPARTMENT", precision = 10, nullable = false)
	@Comment(value = "부서코드")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer noDepartment;

	@Column(name = "NM_DEPARTMENT", length = 100, nullable = false)
	@Comment(value = "부서명")
    @ColumnPosition(2)
	private String nmDepartment;

	@Column(name = "NO_SORT", precision = 3, nullable = false)
	@Comment(value = "순번")
    @ColumnPosition(3)
	private Integer noSort;

	@Column(name = "YN_USE", length = 1, nullable = false)
	@Comment(value = "사용여부")
    @ColumnPosition(4)
	private String ynUse;

	@Column(name = "REMARK", length = 65535)
	@Comment(value = "비고")
    @ColumnPosition(5)
	private String remark;


    @Override
    public Integer getId() {
        return noDepartment;
    }
}
