package com.axboot.freelancer.domain.base.developer;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "developer")
@Comment(value = "")
@Alias("developer")
public class Developer extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_DEVELOPER", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noDeveloper;

	@Column(name = "NM_DEVELOPER", length = 20, nullable = false)
	@Comment(value = "개발자명")
	private String nmDeveloper;

	@Column(name = "NO_REGIST", length = 20)
	@Comment(value = "주민등록번호")
	private String noRegist;

	@Column(name = "DT_JOIN", nullable = false)
	@Comment(value = "최초등록일")
	private LocalDate dtJoin;

	@Column(name = "NO_MOBILE", length = 20)
	@Comment(value = "휴대폰번호")
	private String noMobile;

	@Column(name = "EMAIL", length = 100)
	@Comment(value = "이메일주소")
	private String email;

	@Column(name = "ZIP_CODE", length = 10)
	@Comment(value = "우편번호")
	private String zipCode;

	@Column(name = "ADDRESS", length = 255)
	@Comment(value = "집주소")
	private String address;

	@Column(name = "YN_INVOLVED", length = 20, nullable = false)
	@Comment(value = "프로젝트 참여여부(현재)")
	private String ynInvolved;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noDeveloper;
    }
}