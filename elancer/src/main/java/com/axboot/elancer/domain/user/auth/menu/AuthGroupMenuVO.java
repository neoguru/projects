package com.axboot.elancer.domain.user.auth.menu;

import com.axboot.elancer.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
