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
        <script type="text/javascript" src="<c:url value='/assets/js/view/base/customer/customer.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
        	<ax:form name="searchView0">
        		<ax:tbl clazz="ax-search-tbl" minWidth="500px">
        			<ax:tr>
                        <ax:td label='ax.admin.nmCustomer' width="280px">
                            <ax:input type="text" name="headNmCustomer" id="headNmCustomer" dataPath="headNmCustomer" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
                        <ax:td label='ax.admin.nmCeo' width="280px">
                            <ax:input type="text" name="headNmCeo" id="headNmCeo" dataPath="headNmCeo" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
        				<ax:td label="ax.admin.ynTrade" width="240px">
                           	 <ax:common-code groupCd="YES_NO" id="headYnTrade" dataPath="headYnTrade" emptyText="선택" clazz="form-control W120"/>
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
                            <ax:lang id="ax.admin.customer.list"/> 
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
                    		<ax:lang id="ax.admin.customer.information.basic"/>
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
            					<ax:td label="ax.admin.noCustomer" width="240px" style="display:none">
            						<input type="text" name="noCustomer" data-ax-path="noCustomer" class="form-control" value="" readonly="readonly" />
            					</ax:td>
            					<ax:td label="ax.admin.nmCustomer" width="240px">
            						<input type="text" name="nmCustomer" data-ax-path="nmCustomer" class="form-control" value="" data-ax-validate="required" title="고객명"  style="border-color:Orange;"/>
            					</ax:td>
            					<ax:td label="ax.admin.nmCeo" width="240px">
            						<input type="text" name="nmCeo" data-ax-path="nmCeo" class="form-control" value=""  />
            					</ax:td>
                      			<ax:td label="ax.admin.noLicense" width="240px">
                            		<div class="input-group">
                                		<input type="text" name="noLicense" data-ax-path="noLicense" class="form-control" data-ax5formatter="bizno" style="text-align:center"/>                                	
                            		</div>
                            	</ax:td>
            				</ax:tr>
            				<ax:tr labelWidth="110px"> 
            					<ax:td label="ax.admin.noTel" width="240px">
            						<input type="text" name="noTel" data-ax-path="noTel" class="form-control" value="" data-ax5formatter="phone" />
            					</ax:td>
            					<ax:td label="ax.admin.noFax" width="240px">
            						<input type="text" name="noFax" data-ax-path="noFax" class="form-control" value="" data-ax5formatter="phone" />
            					</ax:td>
            					<ax:td label="ax.admin.ynTrade" width="240px">
            						<ax:common-code groupCd="YES_NO" dataPath="ynTrade" name="ynTrade" clazz="form-control W110" style="border-color:Orange;"/>
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
            						<textarea name="remark" data-ax-path="remark" class="form-control" rows="3s"></textarea>
            					</ax:td>
            				</ax:tr>         	            					
            			</ax:tbl>
            			
            			<div class="H10"></div>
            			
                      	<div class="ax-button-group" role="panel-header">
                      		<div class="left">
                      			<h2>
                      				<i class="cqc-list"></i>
                      				<ax:lang id="ax.admin.customer.charge.list"/>
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