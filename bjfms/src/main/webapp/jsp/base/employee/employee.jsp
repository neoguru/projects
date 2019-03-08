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
        <script type="text/javascript" src="<c:url value='/assets/js/view/base/employee/employee.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/date-ko-KR.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="100px">
                    <ax:tr>
                       <ax:td label="ax.admin.employee.department" width="220px">
                           	 <ax:department id="headNoDepartment" dataPath="headNoDepartment" emptyText="전체" clazz="form-control W100"/>
                        </ax:td>
                        <ax:td label='ax.admin.employee.nmEmployee' width="250px">
                            <ax:input type="text" name="headNmEmployee" id="headNmEmployee" dataPath="headNmEmployee" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
                        <ax:td label="ax.admin.employee.ynWorked" width="220px">
                             <ax:common-code groupCd="YN_RETIRE" id="headYnRetire" dataPath="headYnRetire" emptyText="전체" clazz="form-control W100"/>
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
                            <ax:lang id="ax.admin.employee.employeelist"/> 
                        </h2>
                    </div>
                    <div class="right">
                    	<button type="button" class="btn btn-default" data-grid-view-01-btn="list-print">
                    		<i class="cqc-print"></i>
                               	<ax:lang id="ax.admin.list.print"/>
                         </button>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">            
            
            	<ax:tab-layout name="ax2" data_fit_height_content="layout-view-01" style="height:100%;">
            	
            		<ax:tab-panel label="ax.admin.employee.information" scroll="scroll" active="true">     
            		
            			<div data-fit-height-aside="form-view-01">
            			
            				<div class="ax-button-group" role="panel-header">
            					<div class="left">
                     				<h2>
                     					<i class="cqc-news"></i>
                     					<ax:lang id="ax.admin.employee.information.basic"/>
                     				</h2>
                     			</div>
                     			<div class="right">
                     				<button type="button" class="btn btn-default" data-form-view-01-btn="form01-clear">
                     					<i class="cqc-erase"></i>
                     					<ax:lang id="ax.admin.clear"/>
                     				</button>
                  		       		<button type="button" class="btn btn-default" data-form-view-01-btn="form01-save">
                         		   		<i class="cqc-save"></i>
               			             	<ax:lang id="ax.admin.save"/>
                      		   		</button>
                  		       		<button type="button" class="btn btn-default" data-form-view-01-btn="form01-print">
                         		   		<i class="cqc-print"></i>
               			             	<ax:lang id="ax.admin.print"/>
                      		   		</button>
                     			</div>
                     		</div>
                     		
                     		<ax:form name="formView01">
                     		
                     			<ax:tbl clazz="ax-form-tbl" minWidth="500px">                     			
                     				
                            		<ax:tr labelWidth="100px">
                                		<ax:td label="ax.admin.employee.noEmployee" width="240px">
                                    		<input type="text" name="noEmployee" data-ax-path="noEmployee" class="form-control" value="" readonly="readonly"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.nmEmployee" width="240px">
                                    		<input type="text" name="nmEmployee" data-ax-path="nmEmployee" class="form-control" value="" data-ax-validate="required" title="사원명" style="border-color:Orange;"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.nmEmployeeEng" width="240px">
                                    		<input type="text" name="nmEmployeeEng" data-ax-path="nmEmployeeEng" class="form-control" value=""/>
                                		</ax:td>   
                                		<ax:td label="ax.admin.noRegist" width="240px">
                            					<div class="input-group">
                                				<input type="text" name="noRegist" data-ax-path="noRegist" data-ax5formatter-custom="noRegist" class="form-control" data-ax-validate="required" title="주민등록번호"  style="text-align:center;border-color:Orange;"/>                                	
                            					</div>
                                		</ax:td>                                                 
                            		</ax:tr>
                            		
                            		<ax:tr labelWidth="100px">
                                		<ax:td label="ax.admin.noMobile" width="240px">
                            					<div class="input-group">
                                				<input type="text" name="noMobile" class="form-control" data-ax-path="noMobile" data-ax5formatter="phone" data-ax5="formatter"  data-ax-validate="required" title="휴대폰번호" style="border-color:Orange;"/>                                	
                            					</div>
                                		</ax:td>                                   
                                		<ax:td label="ax.admin.employee.department" width="240px">
                           	 				<ax:department id="noDepartment" name="noDepartment" dataPath="noDepartment" clazz="form-control W120" emptyText="선택"  style="border-color:Orange;"/>
                           	 				<!--<ax:department id="noDepartment" name="noDepartment" dataPath="noDepartment" clazz="form-control W120" defaultValue="100203" style="border-color:Orange;"/>-->
                        				</ax:td>   
                                		<ax:td label="ax.admin.employee.dtJoin" width="240px">
                            				<div class="input-group" data-ax5picker="basic">
                                				<input type="text" id="dtJoin" name="dtJoin" data-ax-path="dtJoin" placeholder="yyyy-mm-dd" class="form-control" data-ax-validate="required" title="입사일자"  style="border-color:Orange;"/>
                                				<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            				</div>
                                		</ax:td>                       
                                		<ax:td label="ax.admin.employee.joinType" width="240px">
                                    		<ax:common-code groupCd="CD_JOINTYPE" dataPath="cdJoinType" name="cdJoinType" emptyText="선택" clazz="form-control"/>
                                		</ax:td>                                            
                            		</ax:tr>
                                                                                        
                            		<ax:tr labelWidth="100px">           
                                		<ax:td label="ax.admin.employee.jobGroup" width="240px">
                           	 				<ax:common-code groupCd="CD_JOBGROUP" id="cdJobgroup" dataPath="cdJobgroup" emptyText="선택" clazz="form-control W120"/>
                        				</ax:td>                        			
                                		<ax:td label="ax.admin.employee.jobType" width="240px">
                                	 		<ax:common-code groupCd="CD_JOBTYPE" dataPath="cdJobtype" emptyText="선택" clazz="form-control"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.workDiv" width="240px">
                                	 		<ax:common-code groupCd="CD_WORKDIV" dataPath="cdWorkdiv" emptyText="선택" clazz="form-control"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.cdPosition" width="240px">
                                	 		<ax:common-code groupCd="CD_POSITION" dataPath="cdPosition" emptyText="선택" clazz="form-control"/>
                                		</ax:td>
                            		</ax:tr>
                            
                            		<ax:tr labelWidth="100px">
                                		<ax:td label="ax.admin.employee.ynForeign" width="240px">
                                	 		<ax:common-code groupCd="YES_NO" dataPath="ynForeign" emptyText="선택" clazz="form-control"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.nation" width="240px">
                                	 		<input type="text" name="nmNation" data-ax-path="nmNation" class="form-control" value=""/>                                	
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.ynRetire" width="240px">
                                	 		<ax:common-code groupCd="YN_RETIRE" dataPath="ynRetire" clazz="form-control" style="border-color:Orange;"/>
                                		</ax:td>                         
                                		<ax:td label="ax.admin.employee.dtRetire" width="240px">
                            				<div class="input-group" data-ax5picker="basic">
                                				<input type="text" name="dtRetire" data-ax-path="dtRetire" class="form-control" placeholder="yyyy-mm-dd"/>
                                				<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            				</div>
                                		</ax:td> 
                            		</ax:tr>
                            
                            		<ax:tr labelWidth="100px">
                                		<ax:td label="ax.admin.nmBank" width="240px">
                                	 		<ax:common-code groupCd="CD_BANK" dataPath="cdBank" emptyText="선택" clazz="form-control"/>
                                		</ax:td>
                                		<ax:td label="ax.admin.noAccount" width="480px">
                                	 		<input type="text" name="noAccount" data-ax-path="noAccount" class="form-control" value=""/>                                	
                                		</ax:td>
                                		<ax:td label="ax.admin.repositor" width="240px">
                                	 		<input type="text" name="repositor" data-ax-path="repositor" class="form-control" value=""/>                                	
                                		</ax:td>
                            		</ax:tr>
                            
                            		<ax:tr labelWidth="100px">
                                		<ax:td label="ax.admin.employee.dailyCost" width="240px">
                            				<div class="input-group">
                                				<input type="text" name="dailyCost" class="form-control" data-ax-path="dailyCost" data-ax5formatter="money" data-ax5="formatter"  data-ax-validate="required" title="일단가" style="text-align:right;border-color:Orange;"/>                                	
                            				</div>
                                		</ax:td>
                                		<ax:td label="ax.admin.employee.ynTax" width="240px">
                                	 		<ax:common-code groupCd="YES_NO" dataPath="ynTax" emptyText="선택" clazz="form-control"/>
                                		</ax:td>     
                            		</ax:tr>
                            
                        			<ax:tr labelWidth="100px">
                            			<ax:td label="ax.admin.address.current" width="100%">
                                			<input type="text" data-ax-path="zipCode" class="form-control inline-block W120" readonly="readonly"/>
                                			<button class="btn btn-default" data-form-view-01-btn="zipFind"><i class="cqc-magnifier"></i> <ax:lang id="ax.admin.sample.form.find"/></button>
                                			<div class="H5"></div>
                                			<input type="text" data-ax-path="address" class="form-control"/>
                            			</ax:td>
                        			</ax:tr>                
                     			
                     			</ax:tbl>           
                     		
  								<div class="H10"></div>		
  											
                        		<div class="ax-button-group" data-fit-height-aside="grid-view-02">
                            		<div class="left">
                                		<h3>
                                    		<i class="cqc-list"></i>
                                    		<ax:lang id="ax.admin.employee.siteList"/></h3>
                            		</div>
                     			</div>
                     			
                     		</ax:form>                     			
            			
            			</div>     
            			
            			<div id="gridView02">
            				<div data-ax5grid="grid-view-02" data-fit-height-content="form-view-01" style="height: 200px;"></div>
                    	</div>
     	   		  			 
                  	</ax:tab-panel>
                  	
                  	<ax:tab-panel label="ax.admin.user.information" scroll="scroll">
                  	
                  		<div data-fit-height-aside="form-view-02">
                  		
                  			<div class="ax-button-group" role="panel-header">
                  			
                  				<div class="left">
                  					<h2><i class="cqc-news"></i>
                            			<ax:lang id="ax.admin.user.information"/>
                        			</h2>
                        		</div>
                        		<div class="right">
                  		       		<button type="button" class="btn btn-default" data-form-view-02-btn="form02-save">
                         		   		<i class="cqc-save"></i>
               			             	<ax:lang id="ax.admin.save"/>
                      		   		</button>
                      		   	</div>
                      		   	
                  			</div>
                  			
                  			<!-- 폼--> 
                			<ax:form name="formView02">
                			
                				<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                				
                    				<ax:tr labelWidth="100px">
                    					<ax:td label="ax.admin.user.id" width="240px">
                    						<input type="text" name="userCd" data-ax-path="userCd" class="av-required form-control W120" value=""  data-ax-validate="required" title="아이디"  style="border-color:Orange;" />
                    					</ax:td>
                    					<ax:td label="ax.admin.employee.noEmployee" width="240px">
                    						<input type="text" name="noEmployee" data-ax-path="noEmployee" class="form-control W120" value=""  readonly="readonly"/>
                    					</ax:td>
                    					<ax:td label="ax.admin.user.name" width="240px">
                    						<input type="text" name="userNm" data-ax-path="userNm" class="form-control W120" value=""  readonly="readonly"/>
                    					</ax:td>
                    				</ax:tr>
                    			
                    				<ax:tr labelWidth="100px">
                    					<ax:td label="ax.admin.user.password" width="240px">
                    						<input type="password" name="userPs" data-ax-path="userPs" maxlength="128" class="form-control W120" value="" readonly="readonly"/>
                    					</ax:td>
                    					<ax:td label="ax.admin.user.password.confirm" width="460px">
                    						<input type="password" name="userPs_chk" data-ax-path="userPs_chk" maxlength="128" class="form-control inline-block W120" value="" readonly="readonly"/>
                    	 					&nbsp;
                    						<label>
                    							<input type="checkbox" data-ax-path="password_change" name="password_change" value="Y"/>
                    							<ax:lang id="ax.admin.user.password.change"/>
                    						</label>                    	
                    					</ax:td>
                    				</ax:tr>
                    			
                    				<ax:tr labelWidth="100px">
                    					<ax:td label="ax.admin.user.language" width="240px">
                    						<ax:common-code groupCd="LOCALE" dataPath="locale" clazz="form-control W120"/>
                    					</ax:td>
                    					<ax:td label="ax.admin.use.or.not" width="240px">
                    						<ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="form-control W120" />
                    					</ax:td>
                    					<ax:td label="ax.admin.user.account.status" width="240px">
                    						<ax:common-code groupCd="USER_STATUS" dataPath="userStatus" clazz="form-control W120"/>
                    					</ax:td>
                    				</ax:tr>
                    			
                    				<ax:tr labelWidth="100px">
                    					<ax:td label="ax.admin.remark" width="100%">
                         				<textarea name="remark" data-ax-path="remark" class="form-control" rows="3"></textarea>
                    					</ax:td>
                    				</ax:tr>
                				
                				</ax:tbl>                			
                			
                    			<div class="H10"></div>
                    			
                    			<div id="groupSetting">
                    				
                    				<div class="ax-button-group sm">
                    					<div class="left">
                    						<h3><ax:lang id="ax.admin.user.menu.group.setting"/></h3>
                    					</div>
                    				</div>
                    		                 		
                    				<ax:tbl clazz="ax-form-tbl">
                    					<ax:tr labelWidth="100px">
                    						<ax:td label="ax.admin.user.menu.group" width="260px">
                    							<ax:common-code groupCd="MENU_GROUP" dataPath="menuGrpCd" clazz="form-control W140" emptyText="선택" style="border-color:Orange;"/>
                    						</ax:td>
                    					</ax:tr>
                    				</ax:tbl>
                    		
                    				<div class="H10"></div>
                    				<div class="ax-button-group sm">
                    					<div class="left">
                    						<h3><ax:lang id="ax.admin.user.auth.group.setting"/></h3>
                    					</div>
                    				</div>
                    		
                    				<ax:tbl clazz="ax-form-tbl">
                    					<ax:tr labelWidth="100px">
                    						<ax:td label="ax.admin.user.auth.group" width="260px">
                    							<!--<ax:common-code groupCd="AUTH_GROUP" dataPath="grpAuthCd" name="grpAuthCd" type="checkbox"/>-->
                    							<ax:common-code groupCd="AUTH_GROUP" dataPath="grpAuthCd" name="grpAuthCd" clazz="form-control W140" emptyText="선택" style="border-color:Orange;"/>
                    						</ax:td>
                    					</ax:tr>
                    				</ax:tbl> 
                    		
                    				<div class="H10"></div>
                    				<div class="ax-button-group sm">
                    					<div class="left">
                    						<h3><ax:lang id="ax.admin.user.role.setting"/></h3>
                    					</div>
                    				</div>
                    			</div>   	
                			
                			</ax:form>
                  		
                  		</div>
                  		
                    	<div id="gridView03">
                    		<div data-ax5grid="grid-view-03" data-fit-height-content="form-view-02" style="height: 200px;"></div>
                    		<!-- <div data-ax5grid="grid-view-03" style="height: 200px;"></div>-->
                    	</div>
                  	
                  	</ax:tab-panel>
                                                          
                                                                                             
              </ax:tab-layout>
                    		
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>