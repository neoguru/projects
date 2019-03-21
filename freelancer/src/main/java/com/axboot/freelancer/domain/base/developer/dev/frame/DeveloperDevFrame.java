package com.axboot.freelancer.domain.base.developer.dev.frame;

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
@Table(name = "developer_dev_frame")
@Comment(value = "")
@Alias("developerDevFrame")
public class DeveloperDevFrame extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_FRAME", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noFrame;

	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "개발자번호")
	@ColumnPosition(3)
	private Integer noDeveloper;

	@Column(name = "DEV_FRAME", length = 50, nullable = false)
	@Comment(value = "경험데이터베이스")
	@ColumnPosition(5)
	private String devFrame;


    @Override
    public Integer getId() {
        return noFrame;
    }
}