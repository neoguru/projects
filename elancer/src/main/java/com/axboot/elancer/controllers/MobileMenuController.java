package com.axboot.elancer.controllers;

import com.axboot.elancer.domain.program.mobileMenu.MobileMenu;
import com.axboot.elancer.domain.program.mobileMenu.MobileMenuRequestVO;
import com.axboot.elancer.domain.program.mobileMenu.MobileMenuService;
import com.axboot.elancer.domain.user.auth.menu.AuthGroupMenu;
import com.axboot.elancer.domain.user.auth.menu.AuthGroupMenuService;
import com.axboot.elancer.domain.user.auth.menu.AuthGroupMenuVO;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v2/mobileMenu")
public class MobileMenuController extends BaseController {

    @Inject
    private MobileMenuService mobileMenuService;

    @Inject
    private AuthGroupMenuService authGroupMenuService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse menuList(RequestParams requestParams) {
        List<MobileMenu> list = mobileMenuService.get(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody MobileMenuRequestVO menuVO) {
        mobileMenuService.processMenu(menuVO);
        return ok();
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse update(@PathVariable Long id, @RequestBody MobileMenu menu) {
        mobileMenuService.updateMenu(id, menu);
        return ok();
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.GET}, produces = APPLICATION_JSON)
    public MobileMenu update(@PathVariable Long id) {
        return mobileMenuService.findOne(id);
    }

    @RequestMapping(value = "/auth", method = RequestMethod.GET, produces = APPLICATION_JSON)
    public AuthGroupMenuVO authMapList(RequestParams requestParams) {
        return authGroupMenuService.get(requestParams);
    }

    @RequestMapping(value = "/auth", method = {RequestMethod.PUT}, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<AuthGroupMenu> authGroupMenuList) {
        authGroupMenuService.saveAuth(authGroupMenuList);
        return ok();
    }
}
