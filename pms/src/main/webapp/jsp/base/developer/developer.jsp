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
        <script type="text/javascript" src="<c:url value='/assets/js/view/base/developer/developer.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/date-ko-KR.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr labelWidth="100px">
                        <ax:td label='ax.admin.nmDeveloper' width="220px">
                            <ax:input type="text" name="headNmDeveloper" id="headNmDeveloper" dataPath="headNmDeveloper" clazz="form-control inline-block W100"/>
                        </ax:td>
                        <ax:td  label="ax.admin.typeDeveloper" width="220px">
                             <ax:common-code groupCd="TYPE_DEVELOPER" id="headTypeDeveloper" dataPath="headTypeDeveloper"  emptyText="전체" clazz="form-control inline-block W100"/>
                       </ax:td>
                        <ax:td label='ax.admin.ynKosa' width="220px">
                             <ax:common-code groupCd="YES_NO" id="headYnKosa" dataPath="headYnKosa" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                        <ax:td label='ax.admin.ynLicense' width="220px">
                             <ax:common-code groupCd="YES_NO" id="headYnLicense" dataPath="headYnLicense" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                    </ax:tr>
                    <ax:tr labelWidth="100px">
                        <ax:td  label="ax.admin.bizArea" width="220px">
                             <ax:common-code groupCd="BIZ_AREA" id="headBizArea" dataPath="headBizArea"  emptyText="전체" clazz="form-control inline-block W100"/>
                       </ax:td>
                       <div id="headBizAreaDetailEnterprise" style="display:none">
                       		<ax:td label="ax.admin.bizArea.detail" width="220px">                        
               					<ax:common-code groupCd="ENTERPRISE_AREA" id="headEnterpriseArea" dataPath="headEnterpriseArea" emptyText="전체" clazz="form-control inline-block W100"  />
                       		</ax:td>   
                       		<ax:td label="ax.admin.taskArea" width="220px">      
               					<ax:common-code groupCd="ENTERPRISE_TASK" id="headEnterpriseTask" dataPath="headEnterpriseTask" emptyText="전체" clazz="form-control inline-block W100" />    
                        	</ax:td>
                       </div>                   
                       <div id="headBizAreaDetailFinance" style="display:none">
                       		<ax:td  label="ax.admin.bizArea.detail" width="220px">                        
               					<ax:common-code groupCd="FINANCE_AREA" id="headFinanceArea" dataPath="headFinanceArea" emptyText="전체" clazz="form-control inline-block W100"  />
                       		</ax:td>   
                       		<ax:td  label="ax.admin.taskArea" width="220px">      
               					<ax:common-code groupCd="FINANCE_TASK" id="headFinanceTask" dataPath="headFinanceTask" emptyText="전체" clazz="form-control inline-block W100" />    
                        	</ax:td>
                       </div>     
                        <ax:td label='ax.admin.devLang' width="220px">
                             <ax:common-code groupCd="DEV_LANG" id="headDevLang" dataPath="headDevLang" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                        <ax:td label='ax.admin.devFrame' width="220px">
                             <ax:common-code groupCd="DEV_FRAME" id="headDevFrame" dataPath="headDevFrame" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                        <ax:td label='ax.admin.uiTool' width="220px">
                             <ax:common-code groupCd="UI_TOOL" id="headUiTool" dataPath="headUiTool" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                        <ax:td label='ax.admin.database' width="220px">
                             <ax:common-code groupCd="DATABASE" id="headDb" dataPath="headDb" emptyText="전체" clazz="form-control inline-block W100"/>       
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="32%" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.developer.list"/> 
                        </h2>
                    </div>
                </div>
                
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
            			
            	<ax:tab-layout name="ax2" data_fit_height_content="layout-view-01" style="height:100%;">
            			
            			<ax:tab-panel label="ax.admin.developer.information.basic" scroll="scroll" active="true">
            			
            					<div data-fit-height-aside="form-view-01">
            									
            							<div class="ax-button-group" role="panel-header">
                     						<div class="left">
                     								<h2>
                     									<i class="cqc-news"></i>
                     									<ax:lang id="ax.admin.developer.information.basic"/>
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
                     						</div>
                 						</div>
            					
                						<ax:form name="formView01">
                						
                      						<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                      					
                      							<ax:tr labelWidth="110px">                       					
                      								<ax:td label="ax.admin.noDeveloper" width="240px" style="display:none">
                      									<input type="text" name="noDeveloper" data-ax-path="noDeveloper" class="form-control" value="" readonly="readonly" style="text-align:center;"/>
                      								</ax:td>
                      								<ax:td label="ax.admin.nmDeveloper" width="240px">
                      									<input type="text" name="nmDeveloper" data-ax-path="nmDeveloper" class="form-control" value="" data-ax-validate="required" title="개발자명"  style="border-color:Orange;"/>
                      								</ax:td>				
                      								<ax:td label="ax.admin.typeDeveloper" width="240px">
                                						<ax:common-code groupCd="TYPE_DEVELOPER" dataPath="typeDeveloper" name="typeDeveloper" clazz="form-control W110" style="border-color:Orange;"/>
                         							</ax:td>     			
                      								<ax:td label="ax.admin.dtBirth" width="240px">
                      									<div class="input-group" data-ax5picker="basic">
                      										<input type="text" name="dtBirth" id="dtBirth" data-ax-path="dtBirth" class="form-control" placeholder="yyyy-mm-dd" title="생년월일" />
                      										<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                      									</div>
                      								</ax:td>                 			    	
                      								<ax:td label="ax.admin.gender" width="240px">
                                						<ax:common-code groupCd="GENDER" dataPath="gender" name="gender" clazz="form-control W110" emptyText="선택"   />
                         							</ax:td>      
                      							</ax:tr>
                      					
                      							<ax:tr labelWidth="110px">             			    	
                      								<ax:td label="ax.admin.position" width="240px">
                                						<ax:common-code groupCd="POSITION" dataPath="position" name="position" clazz="form-control W110" emptyText="선택"   />
                         							</ax:td>             
                      								<ax:td label="ax.admin.noMobile" width="240px">
                      									<input type="text" name="noMobile" data-ax-path="noMobile" class="form-control" data-ax5formatter="phone" value="" title="개발자 휴대폰번호" />
                      								</ax:td>
                          							<ax:td label="ax.admin.email" width="480px">
                      									<input type="text" name="email" data-ax-path="email" class="form-control" value="" title="개발자 이메일주소" />
                      								</ax:td>
                      							</ax:tr>
                      					
                      							<ax:tr labelWidth="110px" id="regular_developer">                  			    	
                      								<ax:td label="ax.admin.department" width="240px">
                                						<ax:common-code groupCd="GENDER" dataPath="gender" name="gender" clazz="form-control W110" emptyText="선택"   />
                         							</ax:td>             
                      								<ax:td label="ax.admin.dtJoin" width="240px">
                      									<div class="input-group" data-ax5picker="basic">
                      										<input type="text" name="dtJoin" id="dtJoin" data-ax-path="dtJoin" class="form-control" placeholder="yyyy-mm-dd" title="입사일자" />
                      										<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                      									</div>
                      								</ax:td>        			    	
                      								<ax:td label="ax.admin.ynRetire" width="240px">
                                						<ax:common-code groupCd="YES_NO" dataPath="ynRetire" name="ynRetire" clazz="form-control W110" emptyText="선택"  style="border-color:Orange;"/>
                         							</ax:td>     		
                      								<ax:td label="ax.admin.dtRetire" width="240px" style="display:none">
                      									<div class="input-group" data-ax5picker="basic" >
                      										<input type="text" name="dtRetire" id="dtRetire" data-ax-path="dtRetire" class="form-control" placeholder="yyyy-mm-dd" title="퇴사일자" style="border-color:Orange;"/>
                      										<span class="input-group-addon"   style="border-color:Orange;"><i class="cqc-calendar" ></i></span>
                      									</div>
                      								</ax:td>                    			    		
                      							</ax:tr>
                      							
                      							<ax:tr labelWidth="110px" id="partner_developer"  style="display:none">
                        							<ax:td label='ax.admin.developer.partner' width="480px" id="bodyPartner" >
                            							<input type="text" data-ax-path="noPartner" id="noPartner" class="form-control inline-block W100" readonly="readonly" >
                            							<button title="지우기" type="button" id="bodyPartnerErase" class="btn btn-default" data-form-view-01-btn="body-partner-clear" >
                               								<i class="cqc-erase"></i>    
                            							</button>
                           								<input type="text" data-ax-path="nmPartner" id="nmPartner" class="form-control inline-block W120" readonly="readonly" ">
                           								<button title="거래처팝업" type="button" id="bodyPartnerModal" class="btn btn-default" data-form-view-01-btn="body-partner-modal"  >
                           									<i class="cqc-magnifier"></i> 
                           									<ax:lang id="ax.admin.search"/>
                           								</button>
                        							</ax:td>
                      							</ax:tr>
                      							
                      							<ax:tr labelWidth="110px">      
                      								<ax:td label="ax.admin.dtCareer" width="240px" >
                      									<div class="input-group" data-ax5picker="basic" >
                      										<input type="text" name="dtCareer" id="dtCareer" data-ax-path="dtCareer" class="form-control" placeholder="yyyy-mm-dd" title="경력시작일자" style="border-color:Orange;"/>
                      										<span class="input-group-addon"   style="border-color:Orange;"><i class="cqc-calendar" ></i></span>
                      									</div>
                      								</ax:td>            			           		
                      								<ax:td label="ax.admin.degree" width="240px">
                                						<ax:common-code groupCd="DEGREE" dataPath="degree" name="degree" clazz="form-control W110" emptyText="선택" style="border-color:Orange;"/>
                         							</ax:td>          	        		
                      								<ax:td label="ax.admin.ynKosa" width="240px">
                                						<ax:common-code groupCd="YES_NO" dataPath="ynKosa" name="ynKosa" clazz="form-control W110" emptyText="선택" style="border-color:Orange;"/>
                         							</ax:td>      
                      								<ax:td label="ax.admin.dtKosa" width="240px" >
                      									<div class="input-group" data-ax5picker="basic" >
                      										<input type="text" name="dtKosa" id="dtKosa" data-ax-path="dtKosa" class="form-control" placeholder="yyyy-mm-dd" title="KOSA취득일자" />
                      										<span class="input-group-addon" ><i class="cqc-calendar" ></i></span>
                      									</div>
                      								</ax:td>            			           		
                      							</ax:tr>
                      					
                      							<ax:tr labelWidth="110px">       			
                      								<ax:td label="ax.admin.ynLicense" width="240px">
                                						<ax:common-code groupCd="YES_NO" dataPath="ynLicense" name="ynLicense" clazz="form-control W110" emptyText="선택" style="border-color:Orange;"/>
                         							</ax:td>
                      								<ax:td label="ax.admin.typeLicense" width="240px">
                                						<ax:common-code groupCd="TYPE_LICENSE" dataPath="typeLicense" name="typeLicense" clazz="form-control W110" emptyText="선택" style="border-color:Orange;"/>
                         							</ax:td>         
                      								<ax:td label="ax.admin.dtLicense" width="240px" >
                      									<div class="input-group" data-ax5picker="basic" >
                      										<input type="text" name="dtLicense" id="dtLicense" data-ax-path="dtLicense" class="form-control" placeholder="yyyy-mm-dd" title="자격증취득일자"/>
                      										<span class="input-group-addon" ><i class="cqc-calendar" ></i></span>
                      									</div>
                      								</ax:td>         	
                      								<ax:td label="ax.admin.grade.career" width="240px">
                                						<ax:common-code groupCd="GRADE" dataPath="gradeCareer" name="gradeCareer" clazz="form-control W110" emptyText=" "  />
                         							</ax:td>   			
                      							</ax:tr>
                      					
         	            						<ax:tr labelWidth="110px">
                          							<ax:td label="ax.admin.address" width="100%">
                            							<input type="text" data-ax-path="zipCode" class="form-control inline-block W100" readonly="readonly"/>
                            							<button class="btn btn-default" data-form-view-01-btn="zipFind"><i class="cqc-magnifier"></i> <ax:lang id="ax.admin.sample.form.find"/></button>
                            							<div class="H5"></div>
                               							<input type="text" data-ax-path="address" class="form-control"/>
                          							</ax:td>
         	            						</ax:tr>
         	            					
                      							<ax:tr labelWidth="110px">
                         							<ax:td label="ax.admin.remark" width="100%">
                         								<textarea name="remark" data-ax-path="remark" class="form-control" rows="2s"></textarea>
                            						</ax:td>
                      							</ax:tr>         	            					
                      						</ax:tbl>
                      					
                      						<div class="H10"></div>
                      					
                      						<div class="ax-button-group" role="panel-header" id="contracted_developer" style="display:none">
                      							<div class="left">
                      								<h2>
                      									<i class="cqc-news"></i>
                      									<ax:lang id="ax.admin.developer.project.list"/>
                      								</h2>
                      							</div>
                      							<div class="right">
                      							</div>
                      						</div>
                      				
                						</ax:form>
            					</div>
            				 
            					<div id="gridView02" style="display:none">
            							<div data-ax5grid="grid-view-02" data-fit-height-content="form-view-01" style="height: 200px;"></div>
                    			</div>
     	   		  			
            			</ax:tab-panel>
            	
            			<ax:tab-panel label="ax.admin.developer.information.detail" scroll="scroll" >
            			
							<ax:form name="formView02">
										
								<div class="ax-button-group" role="panel-header">
                            		<div class="left">
                                		<h2>
                                    	<i class="cqc-news"></i>
                                    	<ax:lang id="ax.admin.developer.information.detail"/>
                                		</h2>
                            		</div>
                            		<div class="right">
                  	    						<button type="button" class="btn btn-default" data-form-view-02-btn="form02-save">
                       		   				<i class="cqc-save"></i>
               		            			<ax:lang id="ax.admin.save"/>
                   		   					</button>
                            		</div>
                        		</div>
										
                        		<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        	
                            			<ax:tr labelWidth="110px">
                         					<ax:td label="ax.admin.bizArea" width="100%">
                                			<ax:common-code groupCd="BIZ_AREA" dataPath="bizArea" name="bizArea" type="checkbox"/>
                         					</ax:td>
                            			</ax:tr>
                            			<div id="bodyEnterpriseArea"  >
                            				<ax:tr labelWidth="110px">
                         						<ax:td label="ax.admin.bizArea.enterprise" width="100%">
                                					<ax:common-code groupCd="ENTERPRISE_AREA" dataPath="enterpriseArea" name="enterpriseArea" type="checkbox"/>
                         						</ax:td>
                            				</ax:tr>
                            				<ax:tr labelWidth="110px">
                         						<ax:td label="ax.admin.task.enterprise" width="100%">
                                					<ax:common-code groupCd="ENTERPRISE_TASK" dataPath="enterpriseTask" name="enterpriseTask" type="checkbox"/>
                         						</ax:td>
                            				</ax:tr>                            			
                            			</div>
                            			<div id="bodyFinanceArea" >
                            				<ax:tr labelWidth="110px">
                         						<ax:td label="ax.admin.bizArea.finance" width="100%">
                                					<ax:common-code groupCd="FINANCE_AREA" dataPath="financeArea" name="financeArea" type="checkbox"/>
                         						</ax:td>
                            				</ax:tr>
                            				<ax:tr labelWidth="110px">
                         						<ax:td label="ax.admin.task.finance" width="100%">
                                					<ax:common-code groupCd="FINANCE_TASK" dataPath="financeTask" name="financeTask" type="checkbox"/>
                         						</ax:td>
                            				</ax:tr>
                            			</div>
                            			<ax:tr labelWidth="110px">
                         					<ax:td label="ax.admin.devLang" width="100%">
                                			<ax:common-code groupCd="DEV_LANG" dataPath="devLang" name="devLang" type="checkbox"/>
                         					</ax:td>
                            			</ax:tr>
                            			<ax:tr labelWidth="110px">
                         					<ax:td label="ax.admin.devFrame" width="100%">
                                			<ax:common-code groupCd="DEV_FRAME" dataPath="devFrame" name="devFrame" type="checkbox"/>
                         					</ax:td>
                            			</ax:tr>
                            			<ax:tr labelWidth="110px">
                         					<ax:td label="ax.admin.uiTool" width="100%">
                                			<ax:common-code groupCd="UI_TOOL" dataPath="uiTool" name="uiTool" type="checkbox"/>
                         					</ax:td>
                            			</ax:tr>
                            			<ax:tr labelWidth="110px">
                         					<ax:td label="ax.admin.database" width="100%">
                                			<ax:common-code groupCd="DATABASE" dataPath="database" name="database" type="checkbox"/>
                         					</ax:td>
                            			</ax:tr>
                        		</ax:tbl>										
							</ax:form>
            			</ax:tab-panel>
            	
            			<ax:tab-panel label="ax.admin.developer.information.others" scroll="scroll" >
            			
            			</ax:tab-panel>
            	
            	</ax:tab-layout>           
            </ax:split-panel>         
        </ax:split-layout>

    </jsp:body>
</ax:layout>
