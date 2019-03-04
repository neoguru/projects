package com.axboot.bjfms.security;

import com.axboot.bjfms.code.GlobalConstants;
import com.axboot.bjfms.domain.program.Program;
import com.axboot.bjfms.domain.program.ProgramService;
import com.axboot.bjfms.domain.program.menu.Menu;
import com.axboot.bjfms.domain.program.menu.MenuService;
import com.axboot.bjfms.domain.program.mobileMenu.MobileMenu;
import com.axboot.bjfms.domain.program.mobileMenu.MobileMenuService;
import com.axboot.bjfms.domain.user.SessionUser;
import com.axboot.bjfms.domain.user.auth.menu.AuthGroupMenu;
import com.axboot.bjfms.domain.user.auth.menu.AuthGroupMenuService;
import com.axboot.bjfms.utils.JWTSessionHandler;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.utils.*;
import com.chequer.axboot.core.vo.ScriptSessionVO;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.util.List;

@Service
public class AXBootTokenAuthenticationService {

    private final JWTSessionHandler jwtSessionHandler;

    @Inject
    private ProgramService programService;

    @Inject
    private AuthGroupMenuService authGroupMenuService;

    @Inject
    private MenuService menuService;

    @Inject
    private MobileMenuService mobileMenuService;

    public AXBootTokenAuthenticationService() {
        jwtSessionHandler = new JWTSessionHandler(DatatypeConverter.parseBase64Binary("YXhib290"));
    }

    public int tokenExpiry() {
        if (PhaseUtils.isProduction()) {
            return 60 * 50;
        } else {
            return 60 * 10 * 10 * 10 * 10;
        }
    }

    public void addAuthentication(HttpServletResponse response, AXBootUserAuthentication authentication) throws IOException {
        final SessionUser user = authentication.getDetails();
        setUserEnvironments(user, response);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public void setUserEnvironments(SessionUser user, HttpServletResponse response) throws IOException {
        String token = jwtSessionHandler.createTokenForUser(user);
        CookieUtils.addCookie(response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY, token, tokenExpiry());
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws IOException {
        RequestUtils requestUtils = RequestUtils.of(request);
        final String token = CookieUtils.getCookieValue(request, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        final String progCd = FilenameUtils.getBaseName(request.getServletPath());
        final Long menuId = requestUtils.getLong("menuId");
        final String requestUri = request.getRequestURI();
        final String language = requestUtils.getString(GlobalConstants.LANGUAGE_PARAMETER_KEY, "");

        if (StringUtils.isNotEmpty(language)) {
            CookieUtils.addCookie(response, GlobalConstants.LANGUAGE_PARAMETER_KEY, language);
        }

        if (token == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }

        SessionUser user = jwtSessionHandler.parseUserFromToken(token);

        if (user == null) {
            return deleteCookieAndReturnNullAuthentication(request, response);
        }

        if (!requestUri.startsWith(ContextUtil.getBaseApiPath())) {
        	
            if (menuId > 0) {
            	
            	if (menuId < 100000) {														
                    Menu menu = menuService.findOne(menuId);

                    if (menu != null) {
                        Program program = menu.getProgram();

                        if (program != null) {
                            requestUtils.setAttribute("program", program);
                            requestUtils.setAttribute("pageName", menu.getLocalizedMenuName(request));
                            requestUtils.setAttribute("pageRemark", program.getRemark());

                            if (program.getAuthCheck().equals(AXBootTypes.Used.YES.getLabel())) {
                                AuthGroupMenu authGroupMenu = authGroupMenuService.getCurrentAuthGroupMenu(menuId, user);
                                if (authGroupMenu == null) {
                                    throw new AccessDeniedException("Access is denied");
                                }
                                requestUtils.setAttribute("authGroupMenu", authGroupMenu);
                            }
                        }
                    }
            	} else {																												/* 2018. 02. 12 수정 --> mobile menu 처리 */
                    MobileMenu menu = mobileMenuService.findOne(menuId);

                    if (menu != null) {
                        Program program = menu.getProgram();

                        if (program != null) {
                            requestUtils.setAttribute("program", program);
                            requestUtils.setAttribute("pageName", menu.getLocalizedMenuName(request));
                            requestUtils.setAttribute("pageRemark", program.getRemark());

                            if (program.getAuthCheck().equals(AXBootTypes.Used.YES.getLabel())) {
                                AuthGroupMenu authGroupMenu = authGroupMenuService.getCurrentAuthGroupMenu(menuId, user);
                                if (authGroupMenu == null) {
                                    throw new AccessDeniedException("Access is denied");
                                }
                                requestUtils.setAttribute("authGroupMenu", authGroupMenu);
                            }
                        }
                    }
            	}
            }

            ScriptSessionVO scriptSessionVO = ModelMapperUtils.map(user, ScriptSessionVO.class);
            scriptSessionVO.setDateFormat(scriptSessionVO.getDateFormat().toUpperCase());
            scriptSessionVO.getDetails().put("language", requestUtils.getLocale(request).getLanguage());
            
            scriptSessionVO.getDetails().put("authGroup", user.getAuthGroupList().get(0));							//2017.06.28 추가 js에서 권한그룹 사용위해 추가
            scriptSessionVO.getDetails().put("noEmployee", user.getNoEmployee());												//2017.06.28 추가 js에서 noEmployee 사용위해 추가
            scriptSessionVO.getDetails().put("noDepartment", user.getNoDepartment());									//2017.06.28 추가 js에서 noDepartment 사용위해 추가
            
            requestUtils.setAttribute("loginUser", user);
            requestUtils.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));

            if (progCd.equals("main") || progCd.equals("main_1")) {																	//2018.01.26 , 2018.02.20 수정
                List<Menu> menuList = menuService.getAuthorizedMenuList(user.getMenuGrpCd(), user.getAuthGroupList());
                requestUtils.setAttribute("menuJson", JsonUtils.toJson(menuList));
            } else {     /* || progCd.equals("mobile_main")  || || progCd.equals("mobile_main_1") */
                List<MobileMenu> menuList = mobileMenuService.getAuthorizedMenuList(user.getMenuGrpCd(), user.getAuthGroupList());
                requestUtils.setAttribute("menuJson", JsonUtils.toJson(menuList));
            }
        }

        setUserEnvironments(user, response);

        return new AXBootUserAuthentication(user);
    }

    private Authentication deleteCookieAndReturnNullAuthentication(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.deleteCookie(request, response, GlobalConstants.ADMIN_AUTH_TOKEN_KEY);
        ScriptSessionVO scriptSessionVO = ScriptSessionVO.noLoginSession();
        request.setAttribute("scriptSession", JsonUtils.toJson(scriptSessionVO));
        return null;
    }
}
