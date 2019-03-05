package com.axboot.freelancer.domain.user.auth.menu;

import com.axboot.freelancer.domain.program.Program;
import lombok.Data;

import java.util.List;

@Data
public class AuthGroupMenuVO {

    private List<AuthGroupMenu> list;

    private Program program;
}
