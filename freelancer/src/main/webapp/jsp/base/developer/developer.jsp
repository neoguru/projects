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
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>


        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.developer.nmDeveloper' width="280px">
                            <ax:input type="text" name="headNmDeveloper" id="headNmDeveloper" dataPath="headNmDeveloper" clazz="form-control" placeholder="ax.admin.input.search"/>
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
                            <ax:lang id="ax.admin.developer.list"/> 
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
                     			<ax:lang id="ax.admin.developer.information.basic"/>
                     		</h2>
                     	</div>
                     	<div class="right">
                     		<button type="button" class="btn btn-default" data-form-view-01-btn="form-clear">
                     			<i class="cqc-erase"></i>
                     			<ax:lang id="ax.admin.clear"/>
                     		</button>
                     	</div>
                      </div>
                      
                      <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                      	<ax:tr labelWidth="110px"> 
                      		<ax:td label="ax.admin.developer.noDeveloper" width="260px">
                      			<input type="text" name="noDeveloper" data-ax-path="noDeveloper" class="form-control" value="" readonly="readonly" style="text-align:center;"/>
                      		</ax:td>
                      		<ax:td label="ax.admin.developer.nmDeveloper" width="260px">
                      			<input type="text" name="nmDeveloper" data-ax-path="nmDeveloper" class="form-control" value="" data-ax-validate="required" title="개발자명"  style="border-color:Orange;"/>
                      		</ax:td>
                     			<ax:td label="ax.admin.noRegist" width="260px">
                     				<input type="text" name="noRegist" data-ax-path="noRegist" class="form-control" data-ax5formatter-custom="noRegist" value="" />
                     			</ax:td>
                      		<ax:td label="ax.admin.dtJoin" width="260px">
                      			<div class="input-group" data-ax5picker="basic">
                      				<input type="text" name="dtJoin" id="dtJoin" data-ax-path="dtJoin" class="form-control" placeholder="yyyy-mm-dd" />
                      				<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                      			</div>
                      		</ax:td>  
                      	</ax:tr>         
                      	<ax:tr labelWidth="110px"> 
                      		<ax:td label="ax.admin.noMobile" width="260px">
                      			<input type="text" name="noMobile" data-ax-path="noMobile" class="form-control" data-ax5formatter="phone" value="" />
                      		</ax:td>
                          <ax:td label="ax.admin.email" width="520px">
                      			<input type="text" name="email" data-ax-path="email" class="form-control" value="" />
                      		</ax:td>
                      	</ax:tr>
                      </ax:tbl>
                      
                      <div class="H10"></div>
                      
                      <div class="ax-button-group" role="panel-header">
                      	<div class="left">
                      		<h2>
                      			<i class="cqc-news"></i>
                      			<ax:lang id="ax.admin.developer.information.detail"/>
                      		</h2>
                      	</div>
                      	<div class="right">
                      	</div>
                      </div>
                      
                      <div id="panel-free">
                      	<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                      		<ax:tr labelWidth="110px">
                      			<ax:td label="ax.admin.noRegist" width="260px">
                      				<input type="text" name="noRegist" data-ax-path="noRegist" class="form-control" data-ax5formatter-custom="noRegist" value="" />
                      			</ax:td>
                      			<ax:td label="ax.admin.noMobile" width="260px">
                      				<input type="text" name="noMobile" data-ax-path="noMobile" class="form-control" data-ax5formatter="phone" value="" />
                      			</ax:td>
                                <ax:td label="ax.admin.email" width="520px">
                      				<input type="text" name="email" data-ax-path="email" class="form-control" value="" />
                      			</ax:td>
                         	</ax:tr>
                       	               		            
            	            	<ax:tr labelWidth="110px">
            	            		<ax:td label="ax.admin.nmBank" width="260px">
            	            			<input type="text" name="nmBank" data-ax-path="nmBank" class="form-control" value=""/>
            	            		</ax:td>      
                            	<ax:td label="ax.admin.noAccount" width="520px">
            	            			<input type="text" name="noAccount" data-ax-path="noAccount" class="form-control" value=""/>
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
                         	
                          </ax:tbl>
                        </div>
                        
                        <div id="panel-partner" style="display:none;">
                        	 <ax:tbl clazz="ax-form-tbl" minWidth="500px">           	                   	            
            	            	<ax:tr labelWidth="110px">                                
                                <ax:td label="ax.admin.partner" width="520px">
                             		<input type="text" data-ax-path="noPartner" class="form-control inline-block W100" readonly="readonly" />
                             		<button title="지우기" type="button" class="btn btn-default" data-form-view-01-btn="body-input-clear">
                                 		<i class="cqc-erase"></i>
                                 		<!--<ax:lang id="ax.admin.clear"/>-->
                             		</button>
                             		<input type="text" data-ax-path="nmPartner" class="form-control inline-block W140" readonly="readonly" />
                             		<button class="btn btn-default" data-form-view-01-btn="partnerModal" style="border-color:Orange;"><i class="cqc-magnifier"></i> <ax:lang id="ax.admin.search"/></button>
                        			</ax:td>
                         	</ax:tr>   	    	
                          </ax:tbl>
                        </div>    
                        
                      <div class="H10"></div>
                      
                      <div class="ax-button-group" role="panel-header">
                      	<div class="left">
                      		<h2>
                      			<i class="cqc-news"></i>
                      			<ax:lang id="ax.admin.remark"/>
                      		</h2>
                      	</div>
                      	<div class="right">
                      	</div>
                      </div>
                      
                      <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                      	<ax:tr labelWidth="110px">
                         	<ax:td label="ax.admin.remark" width="100%">
                         		<textarea name="remark" data-ax-path="remark" class="form-control" rows="4"></textarea>
                            </ax:td>
                         </ax:tr>           
                      </ax:tbl>                               
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>
