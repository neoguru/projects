package com.axboot.elancer.domain.notice;

import com.axboot.elancer.domain.BaseJpaModel;
import com.axboot.elancer.domain.notice.attach.NoticeAttach;
import com.axboot.elancer.domain.user.User;

import com.chequer.axboot.core.annotations.ColumnPosition;
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
@Table(name = "NOTICE")
@Comment(value = "")
@Alias("notice")
public class Notice extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "NO_NOTICE", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer noNotice;

	@Column(name = "NO_PARENT", precision = 10, nullable = false)
	@Comment(value = "")
    @ColumnPosition(2)
	private Integer noParent;

	@Column(name = "REPLY_LEVEL", precision = 5, nullable = false)
	@Comment(value = "")
    @ColumnPosition(3)
	private Integer replyLevel;

	@Column(name = "REPLY_ORDER", precision = 5, nullable = false)
	@Comment(value = "")
    @ColumnPosition(4)
	private Integer replyOrder;

	@Column(name = "TITLE", length = 100, nullable = false)
	@Comment(value = "제목")
    @ColumnPosition(5)
	private String title;

	@Column(name = "USER_CD", precision = 10, nullable = false)
	@Comment(value = "작성자사용자번호")
    @ColumnPosition(6)
	private String userCd;

	@Column(name = "DT_WRITE", nullable = false)
	@Comment(value = "작성일자")
    @ColumnPosition(7)
	private LocalDate dtWrite = LocalDate.now();

	@Column(name = "VISIT_CNT", precision = 5, nullable = false)
	@Comment(value = "")
    @ColumnPosition(8)
	private Integer visitCnt;

	@Column(name = "FILE_CNT", precision = 5, nullable = false)
	@Comment(value = "")
    @ColumnPosition(9)
	private Integer fileCnt;

	@Column(name = "PASSWORD", length = 20)
	@Comment(value = "비밀번호")
    @ColumnPosition(10)
	private String password;

	@Column(name = "YN_DELETE", length = 1, nullable = false)
	@Comment(value = "논리삭제여부")
    @ColumnPosition(11)
	private String ynDelete;

	@Column(name = "CONTEXT", length = 65535)
	@Comment(value = "내용")
    @ColumnPosition(12)
	private String context;

	@ManyToOne
	@JoinColumn(name="USER_CD", referencedColumnName = "USER_CD", nullable = true, insertable = false, updatable = false)
	private User user;

	@Transient
	private List<NoticeAttach> attachList;


    @Override
    public Integer getId() {
        return noNotice;
    }
}
