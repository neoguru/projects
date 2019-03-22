<%@ tag import="com.axboot.ozpms.utils.CommonCodeUtils" %>
<%@ tag import="com.chequer.axboot.core.utils.ContextUtil" %>
<%@ tag import="com.chequer.axboot.core.utils.PhaseUtils" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%
    String commonCodeJson = CommonCodeUtils.getAllByJson();
    boolean isDevelopmentMode = PhaseUtils.isDevelopmentMode();
    request.setAttribute("isDevelopmentMode", isDevelopmentMode);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>${config.title}</title>
    <link rel="shortcut icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>
    <link rel="icon" href="<c:url value='/assets/favicon.ico'/>" type="image/x-icon"/>

	  
    <c:forEach var="css" items="${config.extendedCss}">
        <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/>
    </c:forEach>
    
    <!--[if lt IE 10]>
    <c:forEach var="css" items="${config.extendedCssforIE9}">
        <link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>"/>
    </c:forEach>
    <![endif]-->

    <script type="text/javascript">
        var CONTEXT_PATH = "<%=ContextUtil.getContext()%>";
        var TOP_MENU_DATA = (function (json) {
            return json;
        })(${menuJson});
        var COMMON_CODE = (function (json) {
            return json;
        })(<%=commonCodeJson%>);
        var SCRIPT_SESSION = (function (json) {
            return json;
        })(${scriptSession});
    </script>

    <script type="text/javascript" src="<c:url value='/assets/js/plugins.min.js' />"></script>
    <script type="text/javascript" src="<c:url value='/assets/js/axboot/dist/axboot.js' />"></script>
    <script type="text/javascript" src="<c:url value='/axboot.config.js' />"></script>
    <!-- <link rel="stylesheet" type="text/css" href="/assets/plugins/bootstrap/dist/css/bootstrap.css" />-->
    
    <!-- shamcey 관련 -->
    <script type="text/javascript" src="<c:url value='/shamcey-20/lib/bootstrap/bootstrap.js' />"></script>
    <!-- <script type="text/javascript" src="<c:url value='/shamcey-20/lib/jquery/jquery.js' />"></script>-->
    <script type="text/javascript" src="<c:url value='/shamcey-20/lib/popper/popper.js' />"></script>
    <script type="text/javascript" src="<c:url value='/shamcey-20/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.js' />"></script>
    
    <script type="text/javascript" src="<c:url value='/shamcey-20/js/shamcey.js' />"></script>

    <!-- Vendor css -->
  	<link rel="stylesheet" href="/shamcey-20/lib/font-awesome/css/font-awesome.css">
  	<!-- Ionicons -->
  	<link rel="stylesheet" href="/shamcey-20/lib/Ionicons/css/ionicons.css">
  	<!-- perfect-scrollbar -->
  	<link rel="stylesheet" href="/shamcey-20/lib/perfect-scrollbar/css/perfect-scrollbar.css">
    <!-- Shamcey CSS -->
    <link rel="stylesheet" href="/shamcey-20/css/shamcey.css">
    
    <jsp:invoke fragment="css"/>
    <jsp:invoke fragment="js"/>
</head>
<!-- <body class="ax-body ${axbody_class}" onselectstart="return false;">-->
<!-- <div id="ax-frame-root" class="<c:if test="${config.layout.leftSideMenu eq 'visible'}">show-aside</c:if>" data-root-container="true">-->
<body class="hide-left" >
<div id="ax-frame-root" data-root-container="true">
    <jsp:doBody/>
    
    <div class="sh-logopanel">
    	<!-- Logo -->
    	<a href="${pageContext.request.contextPath}/jsp/main_1.jsp">
			<img alt="Logo" src="/shamcey-20/img/header-logo-white_1.png" class="wd-150"/>
      </a>
      <a id="navicon" href="" class="sh-navicon d-none d-xl-block"><i class="icon ion-navicon"></i></a>
      <a id="naviconMobile" href="" class="sh-navicon d-xl-none"><i class="icon ion-navicon"></i></a>
    </div><!-- sh-logopanel -->
    
  	<aside class="sh-sideleft-menu" id="ax-frame-aside">
        <script type="text/html" data-tmpl="ax-frame-aside">
            <ul class="nav">
                <div style="height: 10px;"></div>
				
                {{#items}}
				<li class="nav-item">
                	<a href="" data-label-index="{{@i}}" class="nav-link with-sub{{#hasChildren}} {{/hasChildren}}" >
						<i class="fa fa-circle-o text-purple"></i><span>{{{name}}}<span>
					</a>					
                	{{#hasChildren}}
          			<ul class="nav-sub" data-tree-body-index="{{@i}}">
          				<ul class="tree-holder ztree" id="aside-menu-{{@i}}" data-tree-holder-index="{{@i}}"></ul>
                	</ul>
                	{{/hasChildren}}
				</li>
                {{/items}}
            </section>
			
        </script>
  	</aside>
  	
	<header class="sh-headpanel">
		<div class="sh-headpanel-left" id="ax-top-menu" >
		
		</div>
		<div class="sh-headpanel-right">
        	<div class="dropdown mg-r-20">        		
            	<a href="#ax" onclick="fcObj.open_user_info();" class="dropdown-link dropdown-link-loginUser">
            		<ax:lang id="ax.admin.login.status.message" args="${loginUser.userNm}"/>
            	</a>
        	</div>
        	<div class="dropdown mg-r-0">  
            	<a href="#ax" onclick="location.href = '${pageContext.request.contextPath}/api/logout';" class="dropdown-link dropdown-link-loginUser">
					<i class="fa fa-sign-out"></i> 
					<ax:lang id="ax.admin.logout"/>
            	</a>
        	</div>		
		</div>
		
	</header>
	
    <div class="sh-headtab">
        <div id="sh-header-tab-container" ></div>
    </div>
	
  	<!-- Content Wrapper. Contains page content -->
  	<div id="content-frame-container" class="sh-mainpanel">  	
  	</div>
  	
  	<footer class="sh-footer">
    	<div class="pull-right hidden-xs">
      		Last account activity <b id="account-activity-timer">00</b> ago.
    	</div>
    	&nbsp; 
    	<strong> ${config.copyrights}</strong>
  	</footer>
	
</div>
<jsp:invoke fragment="script"/>
</body>
</html>

