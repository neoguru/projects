package com.axboot.bjfms.domain.base.notice.attach;

import com.axboot.bjfms.domain.BaseService;
import com.axboot.bjfms.domain.base.notice.Notice;
import com.axboot.bjfms.domain.file.UploadParameters;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.code.Types;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.EncodeUtils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import net.coobird.thumbnailator.name.Rename;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NoticeAttachService extends BaseService<NoticeAttach, Integer> implements InitializingBean {
	
    private NoticeAttachRepository noticeAttachRepository;

    @Value("${axboot.notice.repository}")
    public String noticeRepository;

    @Inject
    public NoticeAttachService(NoticeAttachRepository noticeAttachRepository) {
        super(noticeAttachRepository);
        this.noticeAttachRepository = noticeAttachRepository;
    }

    public void createBaseDirectory() {
        try {
            FileUtils.forceMkdir(new File(noticeRepository));
        } catch (IOException e) {
        }
    }

    public String getTempDir() {
        return System.getProperty("java.io.tmpdir");
    }

    public File multiPartFileToFile(MultipartFile multipartFile) throws IOException {
        String baseDir = getTempDir() + "/" + UUID.randomUUID().toString();

        FileUtils.forceMkdir(new File(baseDir));

        String tmpFileName = baseDir + "/" + FilenameUtils.getName(multipartFile.getOriginalFilename());

        File file = new File(tmpFileName);

        multipartFile.transferTo(file);
        return file;
    }

    @Transactional
    public NoticeAttach upload(MultipartFile multipartFile, String targetType, String targetId, int sort) throws IOException {
        return upload(multiPartFileToFile(multipartFile), targetType, targetId, sort);
    }

    @Transactional
    public NoticeAttach upload(File file, String targetType, String targetId, int sort) throws IOException {
        UploadParameters uploadParameters = new UploadParameters();
        uploadParameters.setFile(file);
        uploadParameters.setTargetType(targetType);
        uploadParameters.setTargetId(targetId);
        uploadParameters.setSort(sort);

        return upload(uploadParameters);
    }

    @Transactional
    public NoticeAttach upload(UploadParameters uploadParameters) throws IOException {
        File uploadFile = uploadParameters.getFile();

        if (uploadFile == null && uploadParameters.getMultipartFile() != null) {
            uploadFile = multiPartFileToFile(uploadParameters.getMultipartFile());
        }

        String targetType = uploadParameters.getTargetType();
        String targetId = uploadParameters.getTargetId();
        String desc = uploadParameters.getDesc();
        Integer noNotice = uploadParameters.getNoNotice();

        boolean deleteIfExist = uploadParameters.isDeleteIfExist();
        boolean thumbnail = uploadParameters.isThumbnail();

        int sort = uploadParameters.getSort();
        int thumbnailWidth = uploadParameters.getThumbnailWidth();
        int thumbnailHeight = uploadParameters.getThumbnailHeight();

        String fileName = FilenameUtils.getName(uploadFile.getName());
        String extension = FilenameUtils.getExtension(fileName);
        String fileType = getFileType(extension);

        String baseName = UUID.randomUUID().toString();
        String saveName = baseName + "." + extension;
        String savePath = getSavePath(saveName);

        File file = new File(savePath);
        FileUtils.copyFile(uploadFile, file);

        if (deleteIfExist) {
            deleteByTargetTypeAndTargetId(targetType, targetId);
        }
        
        NoticeAttach noticeAttach = new NoticeAttach();
        noticeAttach.setTargetType(targetType);
        noticeAttach.setTargetId(targetId);
        noticeAttach.setFileNm(fileName);
        noticeAttach.setSaveNm(saveName);
        noticeAttach.setSort(sort);
        noticeAttach.setDesc(desc);
        noticeAttach.setNoNotice(noNotice);
        noticeAttach.setFileType(fileType);
        noticeAttach.setExtension(FilenameUtils.getExtension(fileName).toUpperCase());
        noticeAttach.setFileSize(file.length());

        if (fileType.equals(Types.FileType.IMAGE) && thumbnail) {
            try {
                Thumbnails.of(file)
                        .crop(Positions.CENTER)
                        .size(thumbnailWidth, thumbnailHeight)
                        .toFiles(new File(getBasePath()), Rename.SUFFIX_HYPHEN_THUMBNAIL);
            } catch (Exception e) {
            }
        }

        FileUtils.deleteQuietly(uploadFile);

        save(noticeAttach);

        return noticeAttach;
    }

    private String getFileType(String extension) {
        switch (extension.toUpperCase()) {
            case Types.FileExtensions.PNG:
            case Types.FileExtensions.JPG:
            case Types.FileExtensions.JPEG:
            case Types.FileExtensions.GIF:
            case Types.FileExtensions.BMP:
            case Types.FileExtensions.TIFF:
            case Types.FileExtensions.TIF:
                return Types.FileType.IMAGE;

            case Types.FileExtensions.PDF:
                return Types.FileType.PDF;

            default:
                return Types.FileType.ETC;
        }
    }

    public ResponseEntity<byte[]> downloadById(Integer id) throws IOException {
        NoticeAttach noticeAttach = findOne(id);
        System.out.println(noticeAttach.getFileNm());
        return download(noticeAttach);
    }

    public ResponseEntity<byte[]> downloadByTargetTypeAndTargetId(String targetType, String targetId) throws IOException {
    	NoticeAttach noticeAttach = get(targetType, targetId);
        return download(noticeAttach);
    }

    public ResponseEntity<byte[]> download(NoticeAttach noticeAttach) throws IOException {
        if (noticeAttach == null)
            return null;

        byte[] bytes = FileUtils.readFileToByteArray(new File(getSavePath(noticeAttach.getSaveNm())));

        String fileName = EncodeUtils.encodeDownloadFileName(noticeAttach.getFileNm());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("attachment", fileName);

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }

    public void preview(HttpServletResponse response, Integer noAttach, String type) throws IOException {
        NoticeAttach noticeAttach = findOne(noAttach);

        if (noticeAttach == null)
            return;

        MediaType mediaType = null;
        String imagePath = "";

        switch (noticeAttach.getExtension()) {
            case Types.FileExtensions.JPEG:
            case Types.FileExtensions.JPG:
                mediaType = MediaType.IMAGE_JPEG;
                break;

            case Types.FileExtensions.PNG:
                mediaType = MediaType.IMAGE_PNG;
                break;

            case Types.FileExtensions.GIF:
                mediaType = MediaType.IMAGE_GIF;
                break;

            default:
        }

        switch (type) {
            case Types.ImagePreviewType.ORIGIN:
                imagePath = getSavePath(noticeAttach.getSaveNm());
                break;

            case Types.ImagePreviewType.THUMBNAIL:
                imagePath = getSavePath(noticeAttach.getThumbnailFileName());
                break;
        }

        if (mediaType != null) {
            byte[] bytes = FileUtils.readFileToByteArray(new File(imagePath));

            response.setContentType(mediaType.toString());
            response.setContentLength(bytes.length);
            IOUtils.copy(FileUtils.openInputStream(new File(imagePath)), response.getOutputStream());
        }
    }

    public void preview(HttpServletResponse response, Integer noAttach) throws IOException {
        preview(response, noAttach, Types.ImagePreviewType.ORIGIN);
    }

    public void thumbnail(HttpServletResponse response, Integer noAttach) throws IOException {
        preview(response, noAttach, Types.ImagePreviewType.THUMBNAIL);
    }

    public String getBasePath() {
        return noticeRepository;

    }

    public String getSavePath(String saveName) {
        return getBasePath() + "/" + saveName;
    }

    public byte[] getFileBytes(String saveName) throws IOException {
        return FileUtils.readFileToByteArray(new File(getSavePath(saveName)));
    }
    
    public List<NoticeAttach> getNoticeAttachListByNoNotice(Integer noNotice){

    	List<NoticeAttach> list = noticeAttachRepository.findByNoNotice(noNotice);
    	return list;
        
    }
  
    public List<NoticeAttach> gets(RequestParams requestParams) {
    
        String targetType = requestParams.getString("targetType", "");
        String targetId = requestParams.getString("targetId", "");
        String delYn = requestParams.getString("delYn", "");
        String targetIds = requestParams.getString("targetIds", "");
//        requestParams.addSort("sort", Sort.Direction.ASC);
        requestParams.addSort("id", Sort.Direction.DESC);

        Integer noNotice = requestParams.getInt("noNotice");
        
       BooleanBuilder builder = new BooleanBuilder();      
       
        if (isNotEmpty(targetType)) {
            builder.and(qNoticeAttach.targetType.eq(targetType));
        }

        if (noNotice > 0) {
            builder.and(qNoticeAttach.noNotice.eq(noNotice));
        }

        if (isNotEmpty(targetId)) {
            builder.and(qNoticeAttach.targetId.eq(targetId));
        }

        if (isNotEmpty(delYn)) {
            AXBootTypes.Deleted deleted = AXBootTypes.Deleted.get(delYn);
            builder.and(qNoticeAttach.delYn.eq(deleted));
        }

        if (isNotEmpty(targetIds)) {
            Set<String> _ids = Arrays.stream(targetIds.split(",")).collect(Collectors.toSet());
            builder.and(qNoticeAttach.targetId.in(_ids));
        }

        return findAll(builder);
    	
    }

    
    public Page<NoticeAttach> getList(RequestParams<NoticeAttach> requestParams) {
        String targetType = requestParams.getString("targetType", "");
        String targetId = requestParams.getString("targetId", "");
        String delYn = requestParams.getString("delYn", "");
        String targetIds = requestParams.getString("targetIds", "");
//        requestParams.addSort("sort", Sort.Direction.ASC);
        requestParams.addSort("id", Sort.Direction.DESC);

        Integer noNotice = requestParams.getInt("noNotice");
        
        Pageable pageable = requestParams.getPageable();

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(targetType)) {
            builder.and(qNoticeAttach.targetType.eq(targetType));
        }

        if (noNotice > 0) {
            builder.and(qNoticeAttach.noNotice.eq(noNotice));
        }

        if (isNotEmpty(targetId)) {
            builder.and(qNoticeAttach.targetId.eq(targetId));
        }

        if (isNotEmpty(delYn)) {
            AXBootTypes.Deleted deleted = AXBootTypes.Deleted.get(delYn);
            builder.and(qNoticeAttach.delYn.eq(deleted));
        }

        if (isNotEmpty(targetIds)) {
            Set<String> _ids = Arrays.stream(targetIds.split(",")).collect(Collectors.toSet());
            builder.and(qNoticeAttach.targetId.in(_ids));
        }

        return findAll(builder, pageable);
    }

    public NoticeAttach get(RequestParams<NoticeAttach> requestParams) {
        List<NoticeAttach> noticeAttaches = getList(requestParams).getContent();
        return isEmpty(noticeAttaches) ? null : noticeAttaches.get(0);
    }

    public NoticeAttach get(String targetType, String targetId) {
        RequestParams<NoticeAttach> requestParams = new RequestParams<>(NoticeAttach.class);
        requestParams.put("targetType", targetType);
        requestParams.put("targetId", targetId);

        return get(requestParams);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        createBaseDirectory();
    }

    @Transactional
    public void deleteFile(Integer id) {
        delete(qNoticeAttach).where(qNoticeAttach.id.eq(id)).execute();        
    }

    @Transactional
    public void deleteByTargetTypeAndTargetIds(String targetType, Set<String> targetIds) {
        delete(qNoticeAttach).where(qNoticeAttach.targetType.eq(targetType).and(qNoticeAttach.targetId.in(targetIds))).execute();
    }

    @Transactional
    private void deleteByTargetTypeAndTargetId(String targetType, String targetId) {
        delete(qNoticeAttach).where(qNoticeAttach.targetType.eq(targetType).and(qNoticeAttach.targetId.eq(targetId))).execute();
    }
    
    @Transactional
    public void updateOrDelete(List<NoticeAttach> attachList) {
    	
        for (NoticeAttach file : attachList) {
            if (file.isDeleted()) {
            	  String del_file = noticeRepository + "/" + file.getSaveNm();
            	  System.out.println(del_file);
                deleteFile(file.getId());
                
                File file_del = new File(del_file);
                file_del.delete();
                
            } else {
                update(qNoticeAttach).set(qNoticeAttach.targetType, file.getTargetType()).set(qNoticeAttach.targetId, file.getTargetId()).where(qNoticeAttach.id.eq(file.getId())).execute();
            }
        }
    }    
}

