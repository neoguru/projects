package com.axboot.freelancer.domain.request;

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
@Table(name = "request")
@Comment(value = "요청테이블")
@Alias("request")
public class Request extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_REQUEST", precision = 10, nullable = false)
	@Comment(value = "요청번호")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noRequest;

	@Column(name = "NO_PROJECT", precision = 10, nullable = false)
	@Comment(value = "프로젝트번호")
	private Integer noProject;

	@Column(name = "NO_PARTNER", precision = 10, nullable = false)
	@Comment(value = "거래처번호")
	private Integer noPartner;

	@Column(name = "DT_REQUEST", nullable = false)
	@Comment(value = "요청접수일자")
	private LocalDate dtRequest;

	@Column(name = "PLACE", length = 255, nullable = false)
	@Comment(value = "프로젝트장소")
	private String place;

	@Column(name = "BIZ_AREA", length = 50)
	@Comment(value = "사업영역")
	private String bizArea;

	@Column(name = "DEV_AREA", length = 50)
	@Comment(value = "개발영역")
	private String devArea;

	@Column(name = "FRAMEWORK", length = 50)
	@Comment(value = "개발프레임웍")
	private String framework;

	@Column(name = "DEV_LANG", length = 50)
	@Comment(value = "개발언어")
	private String devLang;

	@Column(name = "UI_TOOL", length = 50)
	@Comment(value = "UI Tool")
	private String uiTool;

	@Column(name = "SOLUTION", length = 50)
	@Comment(value = "필요솔루션")
	private String solution;

	@Column(name = "DB", length = 50)
	@Comment(value = "데이터베이스")
	private String db;

	@Column(name = "YN_CAREER", length = 1, nullable = false)
	@Comment(value = "경력증빙여부")
	private String ynCareer;

	@Column(name = "REMARK", length = 255)
	@Comment(value = "비고")
	private String remark;


    @Override
    public Integer getId() {
        return noRequest;
    }
}