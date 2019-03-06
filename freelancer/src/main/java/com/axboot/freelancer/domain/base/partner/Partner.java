package com.axboot.freelancer.domain.base.partner;

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
@Table(name = "partner")
@Comment(value = "")
@Alias("partner")
public class Partner extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_PARTNER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noPartner;

	@Column(name = "NM_PARTNER", length = 50, nullable = false)
	@Comment(value = "거래처명")
	private String nmPartner;

	@Column(name = "TYPE_PARTNER", length = 20, nullable = false)
	@Comment(value = "거래처유형(매출업체, 매입업체, 매출/매입)")
	private String typePartner;

	@Column(name = "NO_LICENSE", length = 20)
	@Comment(value = "사업자등록번호")
	private String noLicense;

	@Column(name = "NO_CORP", length = 20)
	@Comment(value = "법인등록번호")
	private String noCorp;

	@Column(name = "NM_CEO", length = 20)
	@Comment(value = "대표자명")
	private String nmCeo;

	@Column(name = "MOBILE_CEO", length = 20)
	@Comment(value = "대표자 휴대폰번호")
	private String mobileCeo;

	@Column(name = "EMAIL_CEO", length = 100)
	@Comment(value = "대표자 이메일")
	private String emailCeo;

	@Column(name = "NO_TEL", length = 20)
	@Comment(value = "회사전화번호")
	private String noTel;

	@Column(name = "NO_FAX", length = 20)
	@Comment(value = "회사팩스번호")
	private String noFax;

	@Column(name = "NO_BANK", length = 10)
	@Comment(value = "은행명")
	private String noBank;

	@Column(name = "NO_ACCOUNT", length = 50)
	@Comment(value = "계좌번호")
	private String noAccount;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "주소")
	private String address;

	@Column(name = "YN_TRADE", length = 10, nullable = false)
	@Comment(value = "거래여부")
	private String ynTrade;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noPartner;
    }
}