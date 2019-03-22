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
        <script type="text/javascript" src="<c:url value='/assets/js/view/request/request.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/date-ko-KR.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr labelWidth="110px">
                        <ax:td label='ax.admin.request.partner' width="440px" id="headPartner">
                            <input type="text" data-ax-path="headNoPartner" id="headNoPartner" class="form-control inline-block W100" readonly="readonly" />
                            <button title="지우기" type="button" class="btn btn-default" data-search-view-01-btn="head-partner-clear">
                               	<i class="cqc-erase"></i>
                            </button>
                           	<input type="text" data-ax-path="headNmPartner" id="headNmPartner" class="form-control inline-block W120" readonly="readonly" />
                           	<button class="btn btn-default" data-search-view-01-btn="head-partner-modal">
                           		<i class="cqc-magnifier"></i> 
                           		<ax:lang id="ax.admin.search"/>
                           	</button>
                        </ax:td>
                        <ax:td label='ax.admin.request.project' width="540px" id="headProject">
                            <input type="text" data-ax-path="headNoProject" id="headNoProject" class="form-control inline-block W100" readonly="readonly" />
                            <button title="지우기" type="button" class="btn btn-default" data-search-view-01-btn="head-project-clear">
                               	<i class="cqc-erase"></i>
                            </button>
                           	<input type="text" data-ax-path="headNmProject" id="headNmProject" class="form-control inline-block W220" readonly="readonly" />
                           	<button class="btn btn-default" data-search-view-01-btn="head-project-modal">
                           		<i class="cqc-magnifier"></i> 
                           		<ax:lang id="ax.admin.search"/>
                           	</button>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="30%" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.request.list"/> 
                        </h2>
                    </div>
                </div>
                
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
            
            	<div data-fit-height-aside="form-view-01">
            		            		          		
            		<div class="ax-button-group" role="panel-header">
                    	<div class="left">
                    		<h2>
                    		<i class="cqc-news"></i>
                    		<ax:lang id="ax.admin.request.information.basic"/>
                    		</h2>
                    	</div>
                     	<div class="right">
                     		<button type="button" class="btn btn-default" data-form-view-01-btn="form01-clear">
                     			<i class="cqc-erase"></i>
                     			<ax:lang id="ax.admin.clear"/>
                     		</button>
                     	</div>
                 	</div>
                 	
            		<ax:form name="formView01">
            			<ax:tbl clazz="ax-form-tbl" minWidth="500px">
            				<ax:tr labelWidth="110px"> 
                        		<ax:td label='ax.admin.request.partner' width="480px" id="bodyPartner">
                            		<input type="text" data-ax-path="noPartner" id="noPartner" class="form-control inline-block W110" readonly="readonly" style="border-color:Orange;"/>
                            		<button title="지우기" type="button" class="btn btn-default" data-form-view-01-btn="body-partner-clear">
                               			<i class="cqc-erase"></i>
                            		</button>
                           			<input type="text" data-ax-path="nmPartner" id="nmPartner" class="form-control inline-block W150" readonly="readonly" style="border-color:Orange;"/>
                           			<button class="btn btn-default" data-form-view-01-btn="body-partner-modal" style="border-color:Orange;"/>
                           				<i class="cqc-magnifier"></i> 
                           				<ax:lang id="ax.admin.search"/>
                           			</button>
                        		</ax:td>
                        		<ax:td label='ax.admin.request.project' width="540px" id="bodyProject">
                            		<input type="text" data-ax-path="noProject" id="noProject" class="form-control inline-block W110" readonly="readonly" style="border-color:Orange;"/>
                            		<button title="지우기" type="button" class="btn btn-default" data-form-view-01-btn="body-project-clear">
                               			<i class="cqc-erase"></i>
                            		</button>
                           			<input type="text" data-ax-path="nmProject" id="nmProject" class="form-control inline-block W150" readonly="readonly" style="border-color:Orange;"/>
                           			<button class="btn btn-default" data-form-view-01-btn="body-project-modal" style="border-color:Orange;"/>
                           				<i class="cqc-magnifier"></i> 
                           				<ax:lang id="ax.admin.search"/>
                           			</button>
                        		</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px">
            					<ax:td label="ax.admin.request.dtRequest" width="240px">
                      				<div class="input-group" data-ax5picker="basic">
                      					<input type="text" name="dtRequest" id="dtRequest" data-ax-path="dtRequest" class="form-control" placeholder="yyyy-mm-dd" style="border-color:Orange;"/>
                      					<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                      				</div>
                      			</ax:td>
                      			<ax:td  label="ax.admin.bizArea" width="240px">
                             		<ax:common-code groupCd="BIZ_AREA" id="bizArea" dataPath="bizArea"  emptyText="무관" clazz="form-control inline-block W110"/>
                       			</ax:td>
            					<ax:td label="ax.admin.place" width="480px">
            						<input type="text" name="place" data-ax-path="place" class="form-control" value="" />
            					</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px"> 
                        		<ax:td label='ax.admin.devFrame' width="240px">
                             		<ax:common-code groupCd="DEV_FRAME" id="devFrame" dataPath="devFrame" emptyText="무관" clazz="form-control inline-block W110"/>       
                        		</ax:td>
                        		<ax:td label='ax.admin.devLang' width="240px">
                             		<ax:common-code groupCd="DEV_LANG" id="devLang" dataPath="devLang" emptyText="선택" clazz="form-control inline-block W110"/>       
                        		</ax:td>
                        		<ax:td label='ax.admin.uiTool' width="240px">
                             		<ax:common-code groupCd="UI_TOOL" id="uiTool" dataPath="uiTool" emptyText="선택" clazz="form-control inline-block W110"/>       
                        		</ax:td>
                        		<ax:td label='ax.admin.database' width="240px">
                             		<ax:common-code groupCd="DATABASE" id="devDb" dataPath="devDb" emptyText="선택" clazz="form-control inline-block W110"/>       
                        		</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px"> 
            					<ax:td label="ax.admin.solution" width="480px">
            						<input type="text" name="solution" data-ax-path="solution" class="form-control" value="" />
            					</ax:td>
                        		<ax:td label='ax.admin.ynCareer' width="240px">
                             		<ax:common-code groupCd="YES_NO" id="ynCareer" dataPath="ynCareer"  clazz="form-control inline-block W110"  style="border-color:Orange;"/>      
                        		</ax:td>
                        		<ax:td label='ax.admin.ynLicense' width="240px">
                             		<ax:common-code groupCd="YES_NO" id="ynLicense" dataPath="ynLicense"  clazz="form-control inline-block W110"  style="border-color:Orange;"/>     
                        		</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px">
            					<ax:td label="ax.admin.remark" width="100%">
            						<textarea name="remark" data-ax-path="remark" class="form-control" rows="3s"></textarea>
            					</ax:td>
            				</ax:tr>         	            					
            			</ax:tbl>
            			
            			<div class="H10"></div>
            			
                      	<div class="ax-button-group" role="panel-header">
                      		<div class="left">
                      			<h2>
                      				<i class="cqc-list"></i>
                      				<ax:lang id="ax.admin.request.information.detail"/>
                      			</h2>
                      		</div>
                      		<div class="right">                      			                     		
                        		<button type="button" class="btn btn-default" data-grid-view-02-btn="gridView02-add" >
                        			<i class="cqc-circle-with-plus"></i>
                      				<ax:lang id="ax.admin.add"/>
                        		</button>
                        		<button type="button" class="btn btn-default" data-grid-view-02-btn="gridView02-del" >
                        			<i class="cqc-circle-with-minus"></i>
                      				<ax:lang id="ax.admin.delete"/>
                        		</button>
                      		</div>
                      	</div>            			
            		</ax:form>            					
            	</div>
            	
            	<div id="gridView02">
            		<div data-ax5grid="grid-view-02" data-fit-height-content="form-view-01" style="height: 200px;"></div>
                </div>
     	   		  			 
            </ax:split-panel>
        	
		</ax:split-layout>

    </jsp:body>
</ax:layout>