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
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.nmEmployee' width="280px">
                            <ax:input type="text" name="headNmEmployee" id="headNmEmployee" dataPath="headNmEmployee" clazz="form-control" placeholder="ax.admin.input.search"/>
                        </ax:td>
                        <ax:td label='ax.admin.ynRetire' width="240px">
                             <ax:common-code groupCd="YN_RETIRE" id="headYnRetier" dataPath="headYnRetier" emptyText="전체" clazz="form-control inline-block W110"/>       
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            프로그램 목록 </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-circle-with-plus"></i> 추가</button>
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="delete"><i class="cqc-circle-with-plus"></i> 삭제</button>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>