package com.axboot.pms.domain.base.developer.dev.lang;

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
@Table(name = "developer_dev_lang")
@Comment(value = "개발자 사용가능 개발언어 테이블")
@Alias("developerDevLang")
public class DeveloperDevLang extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_LANG", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noLang;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "DEV_LANG", length = 50, nullable = false)
	@Comment(value = "경험개발언어")
	@ColumnPosition(5)
	private String devLang;


    @Override
    public Integer getId() {
        return noLang;
    }
}