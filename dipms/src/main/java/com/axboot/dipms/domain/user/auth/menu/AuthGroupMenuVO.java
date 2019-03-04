package com.axboot.dipms.domain.user.auth.menu;

import com.axboot.dipms.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
