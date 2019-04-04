package com.axboot.pms.domain.base.customer.charge;

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
@Table(name = "customer_charge")
@Comment(value = "고객담당자 테이블")
@Alias("customerCharge")
public class CustomerCharge extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_CHARGE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noCharge;

	@Column(name = "NM_CHARGE", length = 20, nullable = false)
	@Comment(value = "고객 담당자명")
	@ColumnPosition(3)
	private String nmCharge;

	@Column(name = "NO_CUSTOMER", precision = 10, nullable = false)
	@Comment(value = "고객번호")
	@ColumnPosition(5)
	private Integer noCustomer;

	@Column(name = "NO_MOBILE", length = 20)
	@Comment(value = "담당자 휴대폰 번호")
	@ColumnPosition(7)
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "담당자 이메일 주소")
	@ColumnPosition(9)
	private String email;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(11)
	private String remark;


    @Override
    public Integer getId() {
        return noCharge;
    }
}