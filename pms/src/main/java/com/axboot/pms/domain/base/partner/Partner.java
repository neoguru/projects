package com.axboot.pms.domain.base.partner;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.pms.domain.BaseJpaModel;
import com.axboot.pms.domain.base.partner.charge.PartnerCharge;

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
@Table(name = "partner")
@Comment(value = "거래처마스터 테이블")
@Alias("partner")
public class Partner extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_PARTNER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noPartner;

	@Column(name = "NM_PARTNER", length = 50, nullable = false)
	@Comment(value = "거래처명")
	@ColumnPosition(3)
	private String nmPartner;

	@Column(name = "TYPE_PARTNER", length = 20, nullable = false)
	@Comment(value = "거래처유형(매출업체, 매입업체, 매출/매입)")
	@ColumnPosition(5)
	private String typePartner;

	@Column(name = "NO_LICENSE", length = 20)
	@Comment(value = "사업자등록번호")
	@ColumnPosition(7)
	private String noLicense;

	@Column(name = "NO_CORP", length = 20)
	@Comment(value = "법인등록번호")
	@ColumnPosition(9)
	private String noCorp;

	@Column(name = "NM_CEO", length = 20, nullable = false)
	@Comment(value = "대표자명")
	@ColumnPosition(11)
	private String nmCeo;

	@Column(name = "MOBILE_CEO", length = 20)
	@Comment(value = "대표자 휴대폰번호")
	@ColumnPosition(13)
	private String mobileCeo;

	@Column(name = "EMAIL_CEO", length = 100)
	@Comment(value = "대표자 이메일")
	@ColumnPosition(15)
	private String emailCeo;

	@Column(name = "NO_TEL", length = 20)
	@Comment(value = "회사전화번호")
	@ColumnPosition(17)
	private String noTel;

	@Column(name = "NO_FAX", length = 20)
	@Comment(value = "회사팩스번호")
	@ColumnPosition(19)
	private String noFax;

	@Column(name = "NM_BANK", length = 50)
	@Comment(value = "은행명")
	@ColumnPosition(21)
	private String nmBank;

	@Column(name = "NO_ACCOUNT", length = 50)
	@Comment(value = "계좌번호")
	@ColumnPosition(23)
	private String noAccount;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	@ColumnPosition(25)
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "주소")
	@ColumnPosition(27)
	private String address;

	@Column(name = "YN_TRADE", length = 10, nullable = false)
	@Comment(value = "거래여부")
	@ColumnPosition(29)
	private String ynTrade;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(31)
	private String remark;

	@OneToMany
	@JoinColumn(name="NO_PARTNER", referencedColumnName = "NO_PARTNER", insertable = false, updatable = false)
	private List<PartnerCharge> chargeList;

	@Transient
	private List<PartnerCharge> chargeListq;

    @Override
    public Integer getId() {
        return noPartner;
    }
}