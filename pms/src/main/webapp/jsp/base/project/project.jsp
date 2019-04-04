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
        <script type="text/javascript" src="<c:url value='/assets/js/view/base/project/project.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.nmProject' width="280px">
                            <ax:input type="text" name="headNmProject" id="headNmProject" dataPath="headNmProject" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
                        <ax:td label='ax.admin.customer' width="440px" id="headCustomer">
                            <input type="text" data-ax-path="headNoCustomer" id="headNoCustomer" class="form-control inline-block W100" readonly="readonly" />
                            <button title="지우기" type="button" class="btn btn-default" data-search-view-01-btn="head-customer-clear">
                               	<i class="cqc-erase"></i>
                            </button>
                           	<input type="text" data-ax-path="headNmCustomer" id="headNmCustomer" class="form-control inline-block W120" readonly="readonly" />
                           	<button class="btn btn-default" data-search-view-01-btn="head-customer-modal">
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
                            <ax:lang id="ax.admin.project.list"/> 
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
                    		<ax:lang id="ax.admin.project.information.basic"/>
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
            					<ax:td label="ax.admin.noProject" width="240px"  style="display:none">
            						<input type="text" name="noProject" data-ax-path="noProject" class="form-control" value="" readonly="readonly" style="text-align:center;"/>
            					</ax:td>
                        		<ax:td label='ax.admin.customer' width="480px" id="bodyCustomer">
                            		<input type="text" data-ax-path="noCustomer" id="noCustomer" class="form-control inline-block W110" readonly="readonly" style="border-color:Orange;"/>
                            		<button title="지우기" type="button" class="btn btn-default" data-form-view-01-btn="body-customer-clear">
                               			<i class="cqc-erase"></i>
                            		</button>
                           			<input type="text" data-ax-path="nmCustomer" id="nmCustomer" class="form-control inline-block W150" readonly="readonly" style="border-color:Orange;"/>
                           			<button class="btn btn-default" data-form-view-01-btn="body-customer-modal" style="border-color:Orange;">
                           				<i class="cqc-magnifier"></i> 
                           				<ax:lang id="ax.admin.search"/>
                           			</button>
                        		</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px"> 
            					<ax:td label="ax.admin.nmProject" width="480px">
            						<input type="text" name="nmProject" data-ax-path="nmProject" class="form-control" value="" data-ax-validate="required" title="프로젝트명"  style="border-color:Orange;"/>
            					</ax:td>
                        		<ax:td label='ax.admin.project.partner.main' width="480px" id="bodyPartnerMain">
                            		<input type="text" data-ax-path="noPartnerMain" id="noPartnerMain" class="form-control inline-block W110" readonly="readonly" />
                            		<button title="지우기" type="button" class="btn btn-default" data-form-view-01-btn="body-partner-clear">
                               			<i class="cqc-erase"></i>
                            		</button>
                           			<input type="text" data-ax-path="nmPartner" id="nmPartner" class="form-control inline-block W150" readonly="readonly" />
                           			<button class="btn btn-default" data-form-view-01-btn="body-partner-modal">
                           				<i class="cqc-magnifier"></i> 
                           				<ax:lang id="ax.admin.search"/>
                           			</button>
                        		</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px"> 
                      			<ax:td label="ax.admin.dtStart" width="240px">
                      				<div class="input-group" data-ax5picker="basic" >
                      					<input type="text" name="dtStart" id="dtStart" data-ax-path="dtStart" class="form-control" placeholder="yyyy-mm-dd" style="border-color:Orange;"/>
                      					<span class="input-group-addon" style="border-color:Orange;"><i class="cqc-calendar"></i></span>
                      				</div>
                      			</ax:td>  
                      			<ax:td label="ax.admin.dtEnd" width="240px">
                      				<div class="input-group" data-ax5picker="basic" >
                      					<input type="text" name="dtEnd" id="dtEnd" data-ax-path="dtEnd" class="form-control" placeholder="yyyy-mm-dd" style="border-color:Orange;"/>
                      					<span class="input-group-addon" style="border-color:Orange;"><i class="cqc-calendar"></i></span>
                      				</div>
                      			</ax:td>  
            					<ax:td label="ax.admin.project.amount.obtain" width="240px">
            						<input type="text" name="amountObtain" data-ax-path="amountObtain" class="form-control" value="" data-ax5formatter="money(int)" value="" style="text-align:right;"/>
            					</ax:td>
            					<ax:td label="ax.admin.project.cost.common" width="240px">
            						<input type="text" name="commonCost" data-ax-path="commonCost" class="form-control" value="" data-ax5formatter="money(int)" value="" style="text-align:right;"/>
            					</ax:td>
            				</ax:tr>				
            				<ax:tr labelWidth="110px">
            					<ax:td label="ax.admin.remark" width="100%">
            						<textarea name="remark" data-ax-path="remark" class="form-control" rows="3s"></textarea>
            					</ax:td>
            				</ax:tr>         	            					
            			</ax:tbl>
            			
            			<div class="H10"></div>
            			<!--  
                      	<div class="ax-button-group" role="panel-header">
                      		<div class="left">
                      			<h2>
                      				<i class="cqc-list"></i>
                      				<ax:lang id="ax.admin.partner.charge.list"/>
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
                      	-->
            		</ax:form>            					
            	</div>
            	<!--  
            	<div id="gridView02">
            		<div data-ax5grid="grid-view-02" data-fit-height-content="form-view-01" style="height: 200px;"></div>
                </div>
     	   		-->  			 
            </ax:split-panel>
        	
		</ax:split-layout>

    </jsp:body>
</ax:layout>