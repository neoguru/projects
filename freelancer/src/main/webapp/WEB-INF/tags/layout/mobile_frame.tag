<%@ tag import="com.axboot.freelancer.utils.CommonCodeUtils" %>
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
    <link rel="stylesheet" type="text/css" href="/assets/plugins/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="/assets/css/axboot.css" />
    
    <!-- adminLTE 관련 -->
    <script type="text/javascript" src="<c:url value='/adminLTE/bower_components/bootstrap/dist/js/bootstrap.min.js' />"></script>
    <script type="text/javascript" src="<c:url value='/adminLTE/dist/js/adminlte.js' />"></script>
    <script type="text/javascript" src="<c:url value='/adminLTE/dist/js/demo.js' />"></script>
    
  	<!-- Bootstrap 3.3.7 -->
  	<!-- <link rel="stylesheet" href="/adminLTE/bower_components/bootstrap/dist/css/bootstrap.css">-->
  	<!-- Font Awesome -->
  	<link rel="stylesheet" href="/adminLTE/bower_components/font-awesome/css/font-awesome.css">
  	<!-- Ionicons -->
  	<link rel="stylesheet" href="/adminLTE/bower_components/Ionicons/css/ionicons.css">
  	<!-- Theme style -->
  	<link rel="stylesheet" href="/adminLTE/dist/css/AdminLTE.css">
  	<!-- AdminLTE Skins. Choose a skin from the css/skins  folder instead of downloading all of them to reduce the load. -->
  	<link rel="stylesheet" href="/adminLTE/dist/css/skins/_all-skins.css">

  	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  	<!--[if lt IE 9]>
  	<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  	<![endif]-->

  	<!-- Google Font -->
  	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  	
    <jsp:invoke fragment="css"/>
    <jsp:invoke fragment="js"/>
</head>
<!-- <body class="ax-body ${axbody_class}" onselectstart="return false;">-->
<!-- <div id="ax-frame-root" class="<c:if test="${config.layout.leftSideMenu eq 'visible'}">show-aside</c:if>" data-root-container="true">-->
<body class="hold-transition skin-blue  fixed sidebar-mini" >
<div id="ax-frame-root" class="wrapper">
    <jsp:doBody/>
    
	<header class="main-header">
    	<!-- Logo -->
    	<a href="${pageContext.request.contextPath}/jsp/mobile_main.jsp" class="logo">
      		<!-- mini logo for sidebar mini 50x50 pixels -->
      		<span class="logo-mini">
				<img alt="miniLogo" src="/adminLTE/dist/img/logo_100.png" class="mini-logo-img img-responsive "/>
	  		</span>	  
	  		<!--<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
      		<!-- logo for regular state and mobile devices -->
      		<span class="logo-lg">
				<img alt="Logo" src="/adminLTE/dist/img/header-logo-white_1.png" class="logo-img img-responsive "/>
	  		</span>
    	</a>
    	<!-- Header Navbar: style can be found in header.less -->
    	<nav class="navbar navbar-static-top">
      		<!-- Sidebar toggle button-->
      		<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        		<span class="sr-only">Toggle navigation</span>
      		</a>

      		<div class="navbar-custom-menu">
        		<ul class="nav navbar-nav">
          			<!-- Messages: style can be found in dropdown.less-->
		  			<li class="dropdown user user-menu">
            			<a href="#ax" onclick="fcObj.open_user_info();" class="dropdown-toggle" data-toggle="dropdown">
            				<ax:lang id="ax.admin.login.status.message" args="${loginUser.userNm}"/>
            			</a>
          			</li>
		  
          			<li>
            			<a href="#ax" onclick="location.href = '${pageContext.request.contextPath}/api/logout';">
							<i class="fa fa-sign-out"></i> 
							<ax:lang id="ax.admin.logout"/>
            			</a>
          			</li>
		  
        		</ul>
      		</div>
    	</nav>
	</header>
	
    <div class="main-header-tab">
        <div id="main-header-tab-container"></div>
    </div>
	
  	<aside class="main-sidebar" id="ax-frame-aside">
        <script type="text/html" data-tmpl="ax-frame-aside">
            <section class="sidebar">
                <div style="height: 10px;"></div>
				<ul class="sidebar-menu" data-widget="tree">
                	{{#items}}
					<li class="treeview">
                	<a href="#" data-label-index="{{@i}}" class="menu-item-label {{#hasChildren}} {{/hasChildren}}" >
							<i class="fa fa-circle-o text-purple"></i><span>{{{name}}}<span>
					</a>					
                	{{#hasChildren}}
          			<div class="treeview-menu" data-tree-body-index="{{@i}}">
          				<ul class="tree-holder ztree" id="aside-menu-{{@i}}" data-tree-holder-index="{{@i}}"></ul>
                	</div>
                	{{/hasChildren}}
					</li>
                	{{/items}}
				</ul>
            </section>
			
        </script>
  	</aside>
  	
  	<!-- Content Wrapper. Contains page content -->
  	<div id="content-frame-container" class="content-wrapper">  	
  	</div>
  	
  	<!-- /.content-wrapper 
  	<footer class="main-footer">
    	<div class="pull-right hidden-xs">
      		<b>Version</b> 2.4.0
    	</div>
    	&nbsp; 
    	<strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights reserved.
  	</footer>
	-->
  	<!-- /.content-wrapper -->
  	<footer class="main-footer">
    	<div class="pull-right hidden-xs">
      		Last account activity <b id="account-activity-timer">00</b> ago.
    	</div>
    	&nbsp; 
    	<strong> ${config.copyrights}</strong>
  	</footer>
	


	<!--  
    <div class="ax-frame-foot">
        <div class="ax-split-col" style="height: 100%;">
            <div class="ax-split-panel text-align-left"> ${config.copyrights} </div>
            <div class="ax-split-panel text-align-right">
                Last account activity <b id="account-activity-timer">00</b> ago.
            </div>
        </div>
    </div>
-->
</div>
<jsp:invoke fragment="script"/>
</body>
</html>
