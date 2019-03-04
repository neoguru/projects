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
        <script type="text/javascript" src="<c:url value='/assets/plugins/fullcalendar-3.10.0/lib/moment.min.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/fullcalendar-3.10.0/fullcalendar.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/fullcalendar-3.10.0/locale/ko.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/fullcalendar-3.10.0/gcal.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/scheduler/scheduler.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/scheduler/scheduler-repeat.js' />"></script>
        
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/date-ko-KR.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/plugins/Datejs/build/parser.js' />"></script>
        
        <script type="text/javascript" src="<c:url value='/assets/plugins/qtip/jquery.qtip.js' />"></script>
        
        <script type="text/javascript" src="<c:url value='/assets/js/view/gaCommon.js' />"></script>
        
        <link rel="stylesheet" type="text/css" href="/assets/plugins/fullcalendar-3.10.0/fullcalendar.css" />
        <link rel="stylesheet" type="text/css" href="/assets/plugins/qtip/jquery.qtip.css" />
        <!-- <link rel="stylesheet" type="text/css" href="/assets/plugins/qtip/jquery.qtip.min.css" />-->

		<style>
		
				.fc-day-number {
					color: #2d3439;
					font-weight: 600;'
				}
				.fc-sun, .fc-sun a {
					color: #BA392F;
					font-weight: 600;
					
				}
				.fc-sat, .fc-sat a {
					color: #4354BA;
					font-weight: 600;
				}
		 
		
		</style>
    </jsp:attribute>
    
    
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>
   
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="100%" style="padding-right: 10px;" scroll="scroll">
            
                <ax:form name="calendarView">
                		
					<div id="calendar"></div>
					
				</ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>
