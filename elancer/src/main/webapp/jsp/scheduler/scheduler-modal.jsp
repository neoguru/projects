<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="일정등록"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/scheduler/scheduler-modal.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/scheduler/scheduler-modal-setData.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/scheduler/scheduler-repeat.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/gaCommon.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/date-ko-KR.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/parser.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/fullcalendar-3.10.0/lib/moment.min.js' />"></script>
        <!-- <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/core.js' />"></script>-->
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.scheduler.modal.title"/>
        </h1>
    </jsp:attribute>
    <jsp:body>
    
    	<ax:form name="head-button">
    		<div id="modal-button">
        		<ax:page-buttons>
            		<button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
            		<button type="button" class="btn btn-info" data-page-btn="save"><ax:lang id="ax.admin.save"/></button>
            		<button type="button" class="btn btn-fn1" data-page-btn="delete"><ax:lang id="ax.admin.delete"/></button>
        		</ax:page-buttons>
        	</div>
    		<div id="repeat-button" style="display:none;">
        		<ax:page-buttons>
            		<button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
            		<button type="button" class="btn btn-info" data-page-btn="detail"><ax:lang id="ax.admin.detail"/></button>
            		<button type="button" class="btn btn-fn1" data-page-btn="delete"><ax:lang id="ax.admin.delete"/></button>
        		</ax:page-buttons>
        	</div>
    		<div id="repeat-detail-button" style="display:none;">
        		<ax:page-buttons>
            		<button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
            		<button type="button" class="btn btn-default" data-page-btn="cancel"><ax:lang id="ax.admin.cancel"/></button>
            		<button type="button" class="btn btn-info" data-page-btn="save"><ax:lang id="ax.admin.save"/></button>
        		</ax:page-buttons>
        	</div>
    		<div id="confirm-button" style="display:none;">
        		<ax:page-buttons>
            		<button type="button" class="btn btn-default" data-page-btn="cancel"><ax:lang id="ax.admin.cancel"/></button>
            		<button type="button" class="btn btn-fn1" data-page-btn="confirm"><ax:lang id="ax.admin.confirm"/></button>
        		</ax:page-buttons>
        	</div>
        </ax:form>
        
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <ax:form name="formView01">
                
                	<div id="modal-panel">
                
                		<ax:tbl clazz="ax-form-tbl" minWidth="300px">
                		
                			<ax:tr labelWidth="110px">
                		 
                				<ax:td label="ax.admin.subject" width="100%">
                					<input type="text" name="title" id="title" data-ax-path="title" class="form-control" value="" data-ax-validate="required" title="제목" style="border-color:Orange;"/> 
                				</ax:td>
                			</ax:tr>
                		
                		</ax:tbl>
                	
                		<div class="H5"></div>
                      
                		<ax:tbl clazz="ax-form-tbl" minWidth="300px">
                	
                			<ax:tr labelWidth="110px">
   	             				<ax:td label="ax.admin.scheduler.dtStart" width="360px">
                					<div class="input-group" data-ax5picker="basic">
                        				<input type="text" name="dtStart" data-ax-path="dtStart" class="form-control  inline-block W120" data-picker-date="date" placeholder="yyyy-mm-dd" data-ax-validate="required" title="시작일자"  style="border-color:Orange;"/>                        		
                       					<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                		<ax:common-code groupCd="TIME" dataPath="tmStart" id="tmStart" emptyText="선택" clazz="form-control"/>
                        				<input type="hidden" name="id" data-ax-path="id" />               
                        			</div>
                        		</ax:td>   
                			</ax:tr>
                			<ax:tr labelWidth="110px">
                        	
                				<ax:td label="ax.admin.scheduler.dtEnd" width="360px">
                					<div class="input-group" data-ax5picker="basic">
                        				<input type="text" name=dtEnd data-ax-path="dtEnd" class="form-control  inline-block W120" data-picker-date="date" placeholder="yyyy-mm-dd" data-ax-validate="required" title="종료일자"  style="border-color:Orange;"/>                		
                       					<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                                		<ax:common-code groupCd="TIME" dataPath="tmEnd" id="tmEnd" emptyText="선택" clazz="form-control"/>
                        			</div>
                        		</ax:td>                                                         
                			
                			</ax:tr>
       
                        	<ax:tr labelWidth="110px">
                            	<ax:td label="ax.admin.scheduler.ynAllday" width="270px">
                               		<ax:common-code groupCd="YN_ALLDAY" dataPath="allDay" name="allDay" type="radio" clazz="form-control" style="border-color:Orange;"/>
                            	</ax:td>           
                            	<ax:td label="ax.admin.scheduler.ynRepeat" width="270px">
                               		<ax:common-code groupCd="YN_REPEAT" dataPath="ynRepeat" id="ynRepeat" name="ynRepeat" clazz="form-control"  style="border-color:Orange;"/>
                            	</ax:td>           
                        	</ax:tr>                       	
                		</ax:tbl>                     	
              
                		<div class="H5"></div>
        
               			<div id="repeat-panel" >													<!-- style="display:none;" -->
               		
               				<div>
               					<ax:tbl clazz="ax-form-tbl" minWidth="500px">          	                      	            
                    				<ax:tr labelWidth="110px">
                          				<ax:td label="ax.admin.scheduler.repeatCycle" width="100%" >
                               				<ax:common-code groupCd="REPEAT_CYCLE" dataPath="repeatCycle" name="repeatCycle" type="radio" clazz="form-control" />
                            			</ax:td>        
                   					</ax:tr>
               					</ax:tbl>
                	
                				<div class="H5"></div>
        
               				</div>
               			  
                    		<ax:tbl clazz="ax-form-tbl" minWidth="500px">              	                      	            
                    			<ax:tr labelWidth="110px" id="interval" >
                          			<ax:td label="ax.admin.scheduler.interval"  width="270px">
                						<input type="text" name="gap" data-ax-path="gap" class="form-control inline-block W80" value="" style="text-align:center;"/> 
                               			<ax:common-code groupCd="INTERVAL" id="intervalCycle" dataPath="intervalCycle" name="intervalCycle" emptyText="선택" clazz="form-control inline-block W60" />
                					</ax:td>
                          			<ax:td label="ax.admin.scheduler.day" id="day" width="270px" >
                               			<ax:common-code groupCd="DAY" dataPath="day" name="day" clazz="form-control inline-block W100" />
                            		</ax:td>        
                          			<ax:td label="ax.admin.scheduler.dayDate" id="dayDate" width="270px" >
                               			<ax:common-code groupCd="DAY_DATE" dataPath="dayDate" name="dayDate" type="radio" clazz="form-control inline-block W100" />
                            		</ax:td>           
                   				</ax:tr>
                   			     
                    			<ax:tr labelWidth="110px" id="base">
                          			<ax:td label="ax.admin.scheduler.dateBase" id="dateBase" width="270px">
                               			<ax:common-code groupCd="DATE" dataPath="date" name="date" emptyText="선택" clazz="form-control  inline-block W100" />
                					</ax:td>
                          			<ax:td label="ax.admin.scheduler.dayBase" id="dayBase" width="270px" >
                               			<ax:common-code groupCd="DAY_COUNT" dataPath="dayCount" name="dayCount" clazz="form-control inline-block W80" />
                               			<ax:common-code groupCd="DAY" dataPath="day" name="day" clazz="form-control inline-block W70" />
                            		</ax:td>        
                   				</ax:tr>
                   			
                				<ax:tr labelWidth="110px" id="dtStartRepeat" >
   	             					<ax:td label="ax.admin.scheduler.dtStartRepeat" width="270px">
                						<div class="input-group" data-ax5picker="basic">
                        					<input type="text" name="dtStartRepeat" data-ax-path="dtStartRepeat" class="form-control" placeholder="yyyy-mm-dd" />                        		
                       						<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                        				</div>
                        			</ax:td>   
                				</ax:tr>
                			
                				<ax:tr labelWidth="110px" id="repeatEnd" >
   	             					<ax:td label="ax.admin.scheduler.repeatEnd" width="270px" >   
                               			<ax:common-code groupCd="REPEAT_END" dataPath="repeatEnd" name="repeatEnd" clazz="form-control inline-block W120" />
                        			</ax:td>   
                          			<ax:td label="ax.admin.scheduler.repeatCount" id="repeatCount" width="270px" >
                						<input type="text" name="repeatCount" data-ax-path="repeatCount" class="form-control inline-block W100" value="" /> 회
                					</ax:td>
   	             					<ax:td label="ax.admin.scheduler.dtEndRepeat" id="dtEndRepeat" width="270px" >
                						<div class="input-group" data-ax5picker="basic">
                        					<input type="text" name="dtEndRepeat" data-ax-path="dtEndRepeat" class="form-control inline-block W120" data-picker-date="date" placeholder="yyyy-mm-dd" />                        		
                       						<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                        				</div>
                        			</ax:td>   
                				</ax:tr>
                   			
                   			</ax:tbl>
                		
                			<div class="H5"></div>
                            	              
                  		</div>
    
                		<ax:tbl clazz="ax-form-tbl" minWidth="300px">          
                        	<ax:tr labelWidth="110px">
                            	<ax:td label="ax.admin.sample.form.etc5" width="100%">
                                	<textarea name="memo"  data-ax-path="memo" class="form-control" rows=4></textarea>
                            	</ax:td>
                        	</ax:tr>           	 	
                		</ax:tbl>
                	
                	</div>
                	
                	<div id="repeat-delete-update-panel" style="display:none;">
                		
                		<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                			<ax:tr labelWidth="100%">   
                				<div id="repeat-delete">
                					<h3>
                            			<ax:td label="ax.script.scheduler.repeat.delete" width="100%">
                						</ax:td>
                					</h3>
                            		<ax:td label="ax.script.scheduler.repeat.delete.text" width="100%">
                            			<ax:input type="hidden" name="repeatDeleteUpdate" id="repeatDeleteUpdate" dataPath="repeatDeleteUpdate" clazz="form-control" />
                					</ax:td>
                				</div>
                		
                				<div id="repeat-update" >
                					<h3>
                            			<ax:td label="ax.script.scheduler.repeat.update" width="100%">
                						</ax:td>
                					</h3>
                            		<ax:td label="ax.script.scheduler.repeat.update.text" width="100%">
                					</ax:td>
                				</div>
                			</ax:tr>
                		
                		</ax:tbl>
                	
                		<div class="H5"></div>
                      
                		<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                	
                        	<ax:tr labelWidth="110px" id="repeat-delete">
                            	<ax:td label="ax.admin.scheduler.select" width="100%">
                               		<ax:common-code groupCd="REPEAT_DELETE" dataPath="repeatDelete" name="repeatDelete" type="radio" clazz="form-control" style="border-color:Orange;"/>
                            	</ax:td>           
                        	</ax:tr>                       	
                        	<ax:tr labelWidth="110px" id="repeat-update">
                            	<ax:td label="ax.admin.scheduler.select" width="100%">
                               		<ax:common-code groupCd="REPEAT_UPDATE" dataPath="repeatUpdate" name="repeatUpdate" type="radio" clazz="form-control" style="border-color:Orange;"/>
                            	</ax:td>           
                        	</ax:tr>                       	
                        
                		</ax:tbl>             
                	
                	</div>
                	
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>