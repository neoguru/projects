package com.axboot.pms.domain.user.auth.menu;

import com.axboot.pms.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
