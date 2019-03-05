package com.axboot.freelancer.domain.notice;

import com.axboot.freelancer.domain.BaseService;
import com.axboot.freelancer.domain.notice.attach.NoticeAttach;
import com.axboot.freelancer.domain.notice.attach.NoticeAttachService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import javax.transaction.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;

import java.util.List;

@Service
public class NoticeService extends BaseService<Notice, Integer> {
	
    private NoticeRepository noticeRepository;

    @Inject
    private NoticeAttachService noticeAttachService;

    @Inject
    public NoticeService(NoticeRepository noticeRepository) {
        super(noticeRepository);
        this.noticeRepository = noticeRepository;
    }

    @Transactional
    public void saveNotice(List<Notice> board) throws Exception {
    	
    	if (isNotEmpty(board)) {

    		for (Notice notice : board) {

            	save(notice);
            	
    			if (notice.getAttachList() != null){
    				for (NoticeAttach attach: notice.getAttachList()) {
    					if (attach.getNoNotice() == null) {
    						attach.setNoNotice(notice.getNoNotice());
    					}    						
    				}
    				noticeAttachService.save(notice.getAttachList());
    				
    			}
    		}
    	}  	    	
    }

    public Notice getNotice(RequestParams requestParams) {
    	
        Notice notice = gets(requestParams).stream().findAny().orElse(null);

        if (notice != null) {        	
//            employee.setEmpInduct(empInductService.getEmpInduct(employee.getNoEmp()));
        	int cnt = notice.getVisitCnt();
        	cnt += 1;
        	notice.setVisitCnt(cnt);
        	
        	save(notice);
        	
        	notice.setAttachList(noticeAttachService.gets(requestParams));
        }

        return notice;
    }

    public Page<Notice> getList(RequestParams<Notice> requestParams) {

    	Integer noNotice = requestParams.getInt("noNotice");
   	 	String boardSearch = requestParams.getString("boardSearch");
   	 	String searchWord = requestParams.getString("searchWord");
   	 	
        requestParams.addSort("noNotice", Sort.Direction.DESC);
   	 	
        Pageable pageable = requestParams.getPageable();
        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(searchWord)){
     	   if (isNotEmpty(boardSearch)){
     		   switch(boardSearch) {
     		   		case "TITLE" :
     		   			builder.and(qNotice.title.like(Expressions.asString("%").concat(searchWord).concat("%")));
     		   			break;
     		   		case "CONTENTS" :
     		   			builder.and(qNotice.context.like(Expressions.asString("%").concat(searchWord).concat("%")));
     		   			break;
     		   		case "WRITER" :
     		   			builder.and(qNotice.user.userNm.like(Expressions.asString("%").concat(searchWord).concat("%")));
     		   			break;
     		   }
     	   } else {
 	   			builder.and(qNotice.title.like(Expressions.asString("%").concat(searchWord).concat("%")));
 	   			builder.and(qNotice.context.like(Expressions.asString("%").concat(searchWord).concat("%")));
 	   			builder.and(qNotice.user.userNm.like(Expressions.asString("%").concat(searchWord).concat("%")));    		   
     	   }
        }
        
        if (noNotice > 0) {
   			builder.and(qNotice.noNotice.eq(noNotice));
        }

        return findAll(builder, pageable);        

    }

    public List<Notice> gets(RequestParams requestParams) {

    	Integer noNotice = requestParams.getInt("noNotice");
   	 	String boardSearch = requestParams.getString("boardSearch");
   	 	String searchWord = requestParams.getString("searchWord");
   	 	
       BooleanBuilder builder = new BooleanBuilder();      
       
       if (isNotEmpty(searchWord)){
    	   if (isNotEmpty(boardSearch)){
    		   switch(boardSearch) {
    		   		case "TITLE" :
    		   			builder.and(qNotice.title.like(Expressions.asString("%").concat(searchWord).concat("%")));
    		   			break;
    		   		case "CONTENTS" :
    		   			builder.and(qNotice.context.like(Expressions.asString("%").concat(searchWord).concat("%")));
    		   			break;
    		   		case "WRITER" :
    		   			builder.and(qNotice.user.userNm.like(Expressions.asString("%").concat(searchWord).concat("%")));
    		   			break;
    		   }
    	   } else {
	   			builder.and(qNotice.title.like(Expressions.asString("%").concat(searchWord).concat("%")));
	   			builder.and(qNotice.context.like(Expressions.asString("%").concat(searchWord).concat("%")));
	   			builder.and(qNotice.user.userNm.like(Expressions.asString("%").concat(searchWord).concat("%")));    		   
    	   }
       }
       
       if (noNotice > 0) {
  			builder.and(qNotice.noNotice.eq(noNotice));
       }

  	 	List<Notice> list = select().from(qNotice).where(builder).orderBy(qNotice.noNotice.desc()).fetch();
    	
  	 	return list;   	
    	
    }
}
