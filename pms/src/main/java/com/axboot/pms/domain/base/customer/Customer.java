package com.axboot.pms.domain.base.customer;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.SimpleJpaModel;
import com.axboot.pms.domain.base.customer.charge.CustomerCharge;

import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;

import java.util.List;

import javax.persistence.*;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "customer")
@Comment(value = "고객마스터 테이블")
@Alias("customer")
public class Customer extends SimpleJpaModel<Integer> {

	@Id
	@Column(name = "NO_CUSTOMER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noCustomer;

	@Column(name = "NM_CUSTOMER", length = 50, nullable = false)
	@Comment(value = "고객명")
	private String nmCustomer;

	@Column(name = "NM_CEO", length = 50)
	@Comment(value = "대표자명")
	private String nmCeo;

	@Column(name = "NO_LICENSE", length = 20)
	@Comment(value = "사업자등록번호")
	private String noLicense;

	@Column(name = "NO_TEL", length = 20)
	@Comment(value = "대표번호")
	private String noTel;

	@Column(name = "NO_FAX", length = 20)
	@Comment(value = "팩스번호")
	private String noFax;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "주소")
	private String address;

	@Column(name = "YN_TRADE", length = 1, nullable = false)
	@Comment(value = "거래여부")
	private String ynTrade;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "")
	private String remark;

	@OneToMany
	@JoinColumn(name="NO_CUSTOMER", referencedColumnName = "NO_CUSTOMER", insertable = false, updatable = false)
	private List<CustomerCharge> chargeList;

	@Transient
	private List<CustomerCharge> chargeListq;


    @Override
    public Integer getId() {
        return noCustomer;
    }
}