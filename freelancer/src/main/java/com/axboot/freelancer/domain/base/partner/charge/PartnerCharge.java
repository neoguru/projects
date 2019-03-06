package com.axboot.freelancer.domain.base.partner.charge;

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
@Table(name = "partner_charge")
@Comment(value = "")
@Alias("partnerCharge")
public class PartnerCharge extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_CHARGE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noCharge;

	@Column(name = "NM_CHARGE", length = 20, nullable = false)
	@Comment(value = "담당자명")
	private String nmCharge;

	@Column(name = "NO_PARTNER", precision = 10, nullable = false)
	@Comment(value = "거래처번호")
	private Integer noPartner;

	@Column(name = "NO_MOBILE", length = 20, nullable = false)
	@Comment(value = "담당자 휴대폰번호")
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "담당자 이메일")
	private String email;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noCharge;
    }
}