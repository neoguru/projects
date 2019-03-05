package com.axboot.freelancer.domain.program.mobileMenu;

import com.axboot.freelancer.domain.BaseService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import com.chequer.axboot.core.utils.ArrayUtils;
import com.querydsl.core.BooleanBuilder;

import java.util.ArrayList;
import java.util.List;

@Service
public class MobileMenuService extends BaseService<MobileMenu, Long> {
    private MobileMenuRepository mobileMenuRepository;

    @Inject
    public MobileMenuService(MobileMenuRepository mobileMenuRepository) {
        super(mobileMenuRepository);
        this.mobileMenuRepository = mobileMenuRepository;
    }

    public List<MobileMenu> get(RequestParams<MobileMenu> requestParams) {
    	
        String menuGrpCd = requestParams.getString("menuGrpCd", "");
        String progCd = requestParams.getString("progCd", "");
        String returnType = requestParams.getString("returnType", "hierarchy");
        boolean menuOpen = requestParams.getBoolean("menuOpen", true);
        List<Long> menuIds = (List<Long>) requestParams.getObject("menuIds");

        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(menuGrpCd)) {
            builder.and(qMobileMenu.menuGrpCd.eq(menuGrpCd));
        }

        if (isNotEmpty(progCd)) {
            builder.and(qMobileMenu.progCd.eq(progCd));
        }

        List<MobileMenu> menuList = select()
                .from(qMobileMenu)
                .leftJoin(qMobileMenu.program, qProgram)
                .fetchJoin()
                .where(builder)
                .orderBy(qMobileMenu.level.asc(), qMobileMenu.sort.asc())
                .fetch();


        if (returnType.equals("hierarchy")) {
            List<MobileMenu> hierarchyList = new ArrayList<>();
            List<MobileMenu> filterList = new ArrayList<>();

            for (MobileMenu menu : menuList) {
                menu.setOpen(menuOpen);

                if (menuIds != null) {
                    if (isNotEmpty(menu.getProgCd()) && !menuIds.contains(menu.getMenuId())) {
                        continue;
                    }
                }

                MobileMenu parent = getParent(hierarchyList, menu);

                if (parent == null) {
                    hierarchyList.add(menu);
                } else {
                    parent.addChildren(menu);
                }
            }

            if (menuIds != null) {
                filterNoChildMenu(filterList, hierarchyList);
            } else {
                filterList.addAll(hierarchyList);
            }

            return filterList;
        }

        return menuList;
        
    }

    public boolean hasTerminalMenu(MobileMenu menu) {
        boolean hasTerminalMenu = false;

        if (isNotEmpty(menu.getChildren())) {
            for (MobileMenu _menu : menu.getChildren()) {
                hasTerminalMenu = hasTerminalMenu(_menu);

                if (hasTerminalMenu) {
                    return true;
                }
            }
        }

        if (isNotEmpty(menu.getProgCd())) {
            hasTerminalMenu = true;
        }

        return hasTerminalMenu;
    }

    public void filterNoChildMenu(List<MobileMenu> filterList, List<MobileMenu> startList) {
        if (isNotEmpty(startList)) {
            for (MobileMenu menu : startList) {
                if (hasTerminalMenu(menu)) {
                	MobileMenu parent = getParent(filterList, menu);

                    if (parent == null) {
                        filterList.add(menu.clone());
                    } else {
                        parent.addChildren(menu.clone());
                    }
                }

                if (isNotEmpty(menu.getChildren())) {
                    filterNoChildMenu(filterList, menu.getChildren());
                }
            }
        }
    }

    public List<MobileMenu> getAuthorizedMenuList(String menuGrpCd, List<String> authGroupList) {
        List<Long> menuIds = select().select(qAuthGroupMenu.menuId).distinct().from(qAuthGroupMenu).where(qAuthGroupMenu.grpAuthCd.in(authGroupList)).fetch();

        RequestParams<MobileMenu> requestParams = new RequestParams<>(MobileMenu.class);
        requestParams.put("menuGrpCd", menuGrpCd);
        requestParams.put("menuIds", menuIds);
        requestParams.put("menuOpen", "false");

        return get(requestParams);
    }

    public MobileMenu getParent(List<MobileMenu> menus, MobileMenu menu) {
    	MobileMenu parent = menus.stream().filter(m -> m.getId().equals(menu.getParentId())).findAny().orElse(null);

        if (parent == null) {
            for (MobileMenu _menu : menus) {
                parent = getParent(_menu.getChildren(), menu);

                if (parent != null)
                    break;
            }
        }

        return parent;
    }

    @Transactional
    public void processMenu(MobileMenuRequestVO menuVO) {
        saveMenu(menuVO.getList());
        deleteMenu(menuVO.getDeletedList());
    }

    @Transactional
    public void saveMenu(List<MobileMenu> menus) {
        if (ArrayUtils.isNotEmpty(menus)) {
            menus.forEach(m -> {
                if (isEmpty(m.getProgCd())) {
                    m.setProgCd(null);
                }

                if (m.getLevel() == 0) {
                    m.setParentId(null);
                }
            });

            save(menus);
            menus.stream().filter(menu -> isNotEmpty(menu.getChildren())).forEach(menu -> {
                menu.getChildren().forEach(m -> m.setParentId(menu.getId()));
                saveMenu(menu.getChildren());
            });
        }
    }
    
    @Transactional
    public void deleteMenu(List<MobileMenu> menus) {
        if (ArrayUtils.isNotEmpty(menus)) {
            delete(menus);
            menus.stream().filter(menu -> isNotEmpty(menu.getChildren())).forEach(menu -> {
                deleteMenu(menu.getChildren());
            });
        }
    }
    @Transactional
    public void updateMenu(Long id, MobileMenu request) {
    	MobileMenu exist = findOne(id);
        exist.setMultiLanguageJson(request.getMultiLanguageJson());
        save(exist);
    }

    
}

