package com.axboot.bjfms.domain.base.employee.gen;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.bjfms.domain.BaseJpaModel;
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
@Table(name = "no_worker_gen")
@Comment(value = "")
@Alias("noWorkerGen")
public class NoWorkerGen extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "SEQ", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer seq;


    @Override
    public Integer getId() {
        return seq;
    }
}