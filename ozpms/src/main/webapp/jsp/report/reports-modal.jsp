<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="${pageName}"/>
<ax:set key="page_auto_height" value="true"/>
<!--<ax:set key="axbody_class" value="baseStyle"/>-->

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/reports/reports-modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title">
           	<i class="cqc-browser"></i>
           	<!--<ax:lang id="ax.admin.employee.modal.title"/>-->
           	<label id="title" name="title">TITLE</label>
        </h1>        
    </jsp:attribute>
    
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>
    
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">            
             
            	<div id="report">         
                	<iframe id="reportView"  width="100%", height="680px"></iframe>     
            		<!-- <canvas id="report_canvas"></canvas>--> 
                	<!-- <iframe id="htmlView" width="100%", height="500px"></iframe>-->
                	<!-- <input type="button" value="Load" onclick="setIframeSRC('iFrame', 'file://I:\\Documents and Settings\\Name\\Desktop\\Test.pdf');" />--> 
				</div>
			
            </ax:split-panel>
        </ax:split-layout>
    
    
    </jsp:body>
</ax:layout>
