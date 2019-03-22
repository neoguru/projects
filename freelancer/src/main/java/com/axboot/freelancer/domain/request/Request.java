package com.axboot.freelancer.domain.request;

import com.chequer.axboot.core.annotations.ColumnPosition;
import com.axboot.freelancer.domain.BaseJpaModel;
import com.axboot.freelancer.domain.base.partner.Partner;
import com.axboot.freelancer.domain.base.project.Project;
import com.axboot.freelancer.domain.request.detail.RequestDetail;

import lombok.*;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import com.chequer.axboot.core.annotations.Comment;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "request")
@Comment(value = "요청테이블")
@Alias("request")
public class Request extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_REQUEST", precision = 10, nullable = false)
	@Comment(value = "요청번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ColumnPosition(1)
	private Integer noRequest;

	@Column(name = "NO_PARTNER", precision = 10, nullable = false)
	@Comment(value = "요청거래처번호")
	@ColumnPosition(3)
	private Integer noPartner;

	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트번호")
	@ColumnPosition(5)
	private Integer noProject;

	@Column(name = "DT_REQUEST", nullable = false)
	@Comment(value = "요청접수일자")
	@ColumnPosition(7)
	private LocalDate dtRequest;

	@Column(name = "PLACE", length = 255, nullable = false)
	@Comment(value = "프로젝트장소")
	@ColumnPosition(9)
	private String place;

	@Column(name = "BIZ_AREA", length = 50)
	@Comment(value = "사업영역")
	@ColumnPosition(11)
	private String bizArea;

	@Column(name = "DEV_FRAME", length = 50)
	@Comment(value = "개발프레임웍")
	@ColumnPosition(13)
	private String devFrame;

	@Column(name = "DEV_LANG", length = 50)
	@Comment(value = "개발언어")
	@ColumnPosition(15)
	private String devLang;

	@Column(name = "UI_TOOL", length = 50)
	@Comment(value = "UI Tool")
	@ColumnPosition(17)
	private String uiTool;

	@Column(name = "DEV_DB", length = 50)
	@Comment(value = "데이터베이스")
	@ColumnPosition(19)
	private String devDb;

	@Column(name = "SOLUTION", length = 50)
	@Comment(value = "필요솔루션")
	@ColumnPosition(21)
	private String solution;

	@Column(name = "YN_CAREER", length = 1, nullable = false)
	@Comment(value = "경력증빙여부")
	@ColumnPosition(23)
	private String ynCareer;

	@Column(name = "YN_LICENSE", length = 1, nullable = false)
	@Comment(value = "자격증보유여부")
	@ColumnPosition(25)
	private String ynLicense;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	@ColumnPosition(27)
	private String remark;

	@ManyToOne
	@JoinColumn(name="NO_PARTNER", referencedColumnName = "NO_PARTNER", insertable = false, updatable = false)
	private Partner partner;

	@ManyToOne
	@JoinColumn(name="NO_PROJECT", referencedColumnName = "NO_PROJECT", insertable = false, updatable = false)
	private Project project;

	@OneToMany
	@JoinColumn(name="NO_REQUEST", referencedColumnName = "NO_REQUEST", insertable = false, updatable = false)
	private List<RequestDetail> detailList;


    @Override
    public Integer getId() {
        return noRequest;
    }
}