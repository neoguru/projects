package com.axboot.ozpms.domain.user.auth.menu;

import com.axboot.ozpms.domain.BaseService;
import com.axboot.ozpms.domain.program.ProgramService;
import com.axboot.ozpms.domain.program.menu.Menu;
import com.axboot.ozpms.domain.program.menu.MenuService;
import com.axboot.ozpms.domain.program.mobileMenu.MobileMenu;
import com.axboot.ozpms.domain.program.mobileMenu.MobileMenuService;
import com.axboot.ozpms.domain.user.SessionUser;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

@Service
public class AuthGroupMenuService extends BaseService<AuthGroupMenu, AuthGroupMenu.AuthGroupMenuId> {
    private AuthGroupMenuRepository authGroupMenuRepository;

    @Inject
    private ProgramService programService;

    @Inject
    private MenuService menuService;

    @Inject
    private MobileMenuService mobileMenuService;

    @Inject
    public AuthGroupMenuService(AuthGroupMenuRepository authGroupMenuRepository) {
        super(authGroupMenuRepository);
        this.authGroupMenuRepository = authGroupMenuRepository;
    }

    public AuthGroupMenuVO get(RequestParams requestParams) {
        Long menuId = requestParams.getLong("menuId");

        AuthGroupMenuVO authGroupMenuV2VO = new AuthGroupMenuVO();

        List<AuthGroupMenu> list = select().from(qAuthGroupMenu).where(qAuthGroupMenu.menuId.eq(menuId)).orderBy(qAuthGroupMenu.createdAt.asc()).fetch();
        authGroupMenuV2VO.setList(list);

        if (menuId < 100000) {
        	Menu menu = menuService.findOne(menuId);
            authGroupMenuV2VO.setProgram(menu.getProgram());        	
        } else {
        	MobileMenu mobileMenu = mobileMenuService.findOne(menuId);
            authGroupMenuV2VO.setProgram(mobileMenu.getProgram());        	
        }
        
        return authGroupMenuV2VO;
    }

    public AuthGroupMenu getCurrentAuthGroupMenu(Long menuId, SessionUser sessionUser) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(qAuthGroupMenu.grpAuthCd.in(sessionUser.getAuthGroupList()));
        builder.and(qAuthGroupMenu.menuId.eq(menuId));

        List<AuthGroupMenu> authorizationList = select().from(qAuthGroupMenu).where(builder).fetch();

        AuthGroupMenu authorization = null;

        for (AuthGroupMenu authGroupMenu : authorizationList) {
            if (authorization == null) {
                authorization = authGroupMenu;
            } else {
                authorization.updateAuthorization(authGroupMenu);
            }
        }

        return authorization;
    }

    @Transactional
    public void saveAuth(List<AuthGroupMenu> authGroupMenuList) {
        for (AuthGroupMenu authGroupMenu : authGroupMenuList) {
            if (authGroupMenu.getUseYn() == AXBootTypes.Used.NO) {
                delete(authGroupMenu);
            } else {
                save(authGroupMenu);
            }
        }
    }
}
