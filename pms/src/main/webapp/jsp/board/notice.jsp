<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />    
        <script type="text/javascript" src="<c:url value='/assets/plugins/ckeditor-4.11.2/ckeditor.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/board/notice.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/ax5ui-uploader/dist/ax5uploader.min.js' />"></script>
        <link rel="stylesheet" type="text/css" href="/assets/plugins/ax5ui-uploader/dist/ax5uploader.css" />
        <!-- <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/ax5ui/ax5ui-uploader/master/dist/ax5uploader.css" />-->
		 <!-- <script type="text/javascript" src="https://cdn.rawgit.com/ax5ui/ax5ui-uploader/master/dist/ax5uploader.min.js"></script>-->
		 <!-- <script type="text/javascript" src="/assets/plugins/ax5ui-uploader/dist/ax5uploader.min.js"></script>-->
    </jsp:attribute>
    
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="300px">
                    <ax:tr>
                        <ax:td label="ax.admin.searchField" width="220px">
                           	 <ax:common-code groupCd="BOARD_SEARCH" id="boardSearch" dataPath="boardSearch" emptyText="전체" clazz="form-control W100"/>
                        </ax:td>
                        <ax:td label='ax.admin.searchWord' width="360px">
                            <ax:input type="text" name="searchWord" id="searchWord" dataPath="searchWord" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="40%" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.board.list"/> 
                        </h2>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
            
                <ax:form name="formView01">
                		
                		<!-- 폼 -->
                     <div class="ax-button-group" role="panel-header">
                     	<div class="left">
                     		<h2>
                     			<i class="cqc-news"></i>
                     			<ax:lang id="ax.admin.board.information"/>
                     		</h2>
                     	</div>
                    		<div class="right">
                    			<button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                    				<i class="cqc-erase"></i>
                    				<ax:lang id="ax.admin.clear"/>
                    			</button>
                    			<button type="button" class="btn btn-default" data-form-view-01-btn="form-edit">
                    				<i class="cqc-pencil"></i>
                    				<ax:lang id="ax.admin.edit"/>
                    			</button>
                    		</div>
                      </div>
                      
                      <ax:tbl clazz="ax-form-tbl" minWidth="300px">
                      
                      	<ax:tr labelWidth="110px">
                      		<ax:td label="ax.admin.subject" width="630px">
                      			<input type="text" name="title" id="title" data-ax-path="title" class="form-control" value="" data-ax-validate="required" title="제목" readonly="readonly" />
                      		</ax:td>
                      		<ax:td label="ax.admin.board.nmWriter" width="260px">
                      			<input type="text" name="nmWriter" id="nmWriter" data-ax-path="nmWriter" class="form-control" value="" readonly="readonly" style="text-align:center;"/>
                      		</ax:td>          
                      	</ax:tr>              
                      </ax:tbl>
                      
                      <div class="H5"></div>
                      
                      <ax:tr>
                      	<textarea name="context" id="context" data-ax-path="context" class="ckeditor"></textarea>                      	
                      </ax:tr>
                      
                      <div class="H10"></div>
                      
                   <!-- upload box 이용할 경우
                      <div data-ax5uploader="upload1">
                      		<!--  
                      	<input type="hidden" name="param1" value="value1"/>
                      	<input type="hidden" name="param2" value="value2"/>
                      		
                      	<button data-ax5uploader-button="selector" class="btn btn-default">
                      		<i class="cqc-upload"></i>
                      		<ax:lang id="ax.admin.fileAdd"/>
                      	</button>
                      			(파일사이즈 : 최대 10M, 파일갯수 : 최대 10개)
                      	<div data-uploaded-box="upload1" data-ax5uploader-uploaded-box="inline" readonly></div>
                      </div>
                      -->
                      
                   <!-- grid 이용할 경우 -->        
                      <div class="ax-button-group" >
                   <!-- drag and drop--> 
                      	<div style="position: fixed;left:0;top:0;width:100%;height:100%;background: #ccc;z-index: 1000;display: none;opacity: 0.8;text-align: center;color: #000;" id="dragover">
                      		<table width="100%" height="100%">
                      			<tr>
                      				<td valign="middle" align="center"><h1>Drop the file here.</h1></td>
                      			</tr>
                      		</table>
                      	</div>      
                      
                      	<div class="left" id="left">   
                      		<div data-ax5uploader="upload1" >
                      			<input type="hidden"  name="noNotice" id="noNotice" data-ax-path="noNotice" class="form-control" />
                      			<button type="button" data-ax5uploader-button="selector" name="file-search" id="file-search" class="btn btn-default" data-form-view-01-btn="file-search">                      				
                      				<i class="cqc-file-code-o"></i>
                      				<ax:lang id="ax.admin.fileSelect"/>                      				
                      			</button>
                      				(파일갯수 : 최대 10개)
                      		</div>
                      	</div>
                      	<div class="right">   
                      		<button type="button" name="file-delete" id="file-delete" class="btn btn-default" data-grid-view-02-btn="file-delete">
                      			<i class="cqc-trashcan"></i>
                      			<ax:lang id="ax.admin.fileDelete"/>
                      		</button>
                      	</div>
                      </div>
                     
                      <div data-ax5grid="grid-view-02" style="height: 200px;"></div>
                      	
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>
