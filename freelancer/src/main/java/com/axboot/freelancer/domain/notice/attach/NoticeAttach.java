package com.axboot.freelancer.domain.notice.attach;

import com.axboot.freelancer.domain.BaseJpaModel;

import com.chequer.axboot.core.annotations.ColumnPosition;
import lombok.*;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import com.chequer.axboot.core.annotations.Comment;
import com.chequer.axboot.core.code.AXBootTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "NOTICE_ATTACH")
@Comment(value = "")
@Alias("noticeAttach")
public class NoticeAttach extends BaseJpaModel<Integer> {

	@Id
	@Column(name = "ID", precision = 10, nullable = false)
	@Comment(value = "")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
	private Integer id;

	@Column(name = "NO_NOTICE", precision = 10)
	@Comment(value = "공지사항 번호")
    @ColumnPosition(2)
	private Integer noNotice;

	@Column(name = "TARGET_TYPE", length = 50)
	@Comment(value = "")
    @ColumnPosition(3)
	private String targetType;

	@Column(name = "TARGET_ID", length = 100)
	@Comment(value = "")
    @ColumnPosition(4)
	private String targetId;

	@Column(name = "FILE_NM", length = 65535)
	@Comment(value = "파일명")
    @ColumnPosition(5)
	private String fileNm;

	@Column(name = "SAVE_NM", length = 65535)
	@Comment(value = "저장 파일명")
    @ColumnPosition(6)
	private String saveNm;

	@Column(name = "FILE_TYPE", length = 30)
	@Comment(value = "파일타입")
    @ColumnPosition(7)
	private String fileType;

	@Column(name = "EXTENSION", length = 10)
	@Comment(value = "파일 확장자")
    @ColumnPosition(8)
	private String extension;

	@Column(name = "FILE_SIZE", precision = 19)
	@Comment(value = "파일 사이즈")
    @ColumnPosition(9)
	private Long fileSize;

	@Column(name = "DEL_YN", length = 1, nullable = false)
	@Comment(value = "논리삭제여부")
    @Type(type = "labelEnum")
    @ColumnPosition(10)
    private AXBootTypes.Deleted delYn = AXBootTypes.Deleted.NO;

	@Column(name = "FILE_DESC", length = 65535)
	@Comment(value = "비고")
    @ColumnPosition(11)
	private String desc;

	@Column(name = "SORT", precision = 10)
	@Comment(value = "")
    @ColumnPosition(12)
	private Integer sort;

    @JsonIgnore
    @Transient
    private String _preview;

    @JsonIgnore
    @Transient
    private String _thumbnail;

    @JsonIgnore
    @Transient
    private String _download;

    @JsonIgnore
    @Transient
    private String _delete;

    @JsonProperty("preview")
    public String preview() {
        if (StringUtils.isEmpty(_preview)) {
            return "/api/v1/noticeattach/preview?id=" + getId();
        }
        return _preview;
    }

    @JsonProperty("thumbnail")
    public String thumbnail() {
        if (StringUtils.isEmpty(_thumbnail)) {
            return "/api/v1/noticeattach/thumbnail?id=" + getId();
        }
        return _thumbnail;
    }

    @JsonProperty("download")
    public String download() {
        if (StringUtils.isEmpty(_download)) {
            return "/api/v1/noticeattach/download?id=" + getId();
        }
        return _download;
    }

    @JsonProperty("delete")
    public String delete() {
        if (StringUtils.isEmpty(_delete)) {
            return "/api/v1/noticeattach/delete?id=" + getId();
        }
        return _delete;
    }

    @Transient
    public String getThumbnailFileName() {
        return FilenameUtils.getBaseName(getSaveNm()) + "-thumbnail" + "." + FilenameUtils.getExtension(getSaveNm());
    }

    @Override
    public Integer getId() {
        return id;
    }
}
