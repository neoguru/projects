package com.axboot.dipms.controllers;

import com.axboot.dipms.domain.notice.attach.NoticeAttach;
import com.axboot.dipms.domain.notice.attach.NoticeAttachService;
import com.axboot.dipms.domain.file.UploadParameters;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/noticeattach")
public class NoticeAttachController extends BaseController {

    @Inject
    private NoticeAttachService noticeAttachService;

    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public NoticeAttach upload(
            @RequestParam(value = "file") MultipartFile multipartFile,
            @RequestParam(value = "targetType", required = false) String targetType,
            @RequestParam(value = "targetId", required = false) String targetId,
            @RequestParam(value = "sort", required = false, defaultValue = "0") int sort,
            @RequestParam(value = "deleteIfExist", required = false, defaultValue = "false") boolean deleteIfExist,
            @RequestParam(value = "desc", required = false) String desc,
            @RequestParam(value = "noNotice", required = true) Integer noNotice,
            @RequestParam(value = "thumbnail", required = false, defaultValue = "false") boolean thumbnail,
            @RequestParam(value = "thumbnailWidth", required = false, defaultValue = "640") int thumbnailWidth,
            @RequestParam(value = "thumbnailHeight", required = false, defaultValue = "640") int thumbnailHeight) throws IOException {

        UploadParameters uploadParameters = new UploadParameters();
        uploadParameters.setMultipartFile(multipartFile);
        uploadParameters.setTargetType(targetType);
        uploadParameters.setTargetId(targetId);
        uploadParameters.setSort(sort);
        uploadParameters.setDeleteIfExist(deleteIfExist);
        uploadParameters.setDesc(desc);
        uploadParameters.setNoNotice(noNotice);
        uploadParameters.setThumbnail(thumbnail);
        uploadParameters.setThumbnailWidth(thumbnailWidth);
        uploadParameters.setThumbnailHeight(thumbnailHeight);

        return noticeAttachService.upload(uploadParameters);
    }


    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<NoticeAttach> requestParams) {
        List<NoticeAttach> list = noticeAttachService.gets(requestParams);
        return Responses.ListResponse.of(list);
    }

/*
    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.PageResponse list(RequestParams<NoticeAttach> requestParams) {
        Page<NoticeAttach> list = noticeAttachService.getList(requestParams);
        return Responses.PageResponse.of(list);
    }
*/
    @RequestMapping(value = "/delete", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public void delete(@RequestParam Integer id) throws IOException {
    	 noticeAttachService.deleteFile(id);
  //      return file;
    }

    /*
    @RequestMapping(value = "/delete", method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<NoticeAttach> delete(@RequestBody List<NoticeAttach> file) {
    	System.out.println("delete.......");
    	 noticeAttachService.deleteAttachFile(file);
        return file;
    }
*/
    @RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public List<NoticeAttach> updateOrDelete(@RequestBody List<NoticeAttach> file) {
    	 noticeAttachService.updateOrDelete(file);
        return file;
    }

    @RequestMapping(value = "/preview", method = RequestMethod.GET)
    public void preview(HttpServletResponse response, @RequestParam Integer id) throws IOException {
    	 noticeAttachService.preview(response, id);
    }

    @RequestMapping(value = "/thumbnail", method = RequestMethod.GET)
    public void thumbnail(HttpServletResponse response, @RequestParam Integer id) throws IOException {
    	 noticeAttachService.thumbnail(response, id);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public ResponseEntity<byte[]> download(@RequestParam Integer id) throws IOException {
        return noticeAttachService.downloadById(id);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET, params = {"targetType", "targetId"})
    public ResponseEntity<byte[]> downloadByTargetTypeAndTargetId(@RequestParam String targetType, @RequestParam String targetId) throws IOException {
        return noticeAttachService.downloadByTargetTypeAndTargetId(targetType, targetId);
    }
    
}
