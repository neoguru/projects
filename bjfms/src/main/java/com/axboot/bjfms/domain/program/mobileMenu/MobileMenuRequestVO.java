package com.axboot.bjfms.domain.program.mobileMenu;

import lombok.Data;

import java.util.List;

@Data
public class MobileMenuRequestVO {

    private List<MobileMenu> list;

    private List<MobileMenu> deletedList;
}
