package com.eavinlau.cube.services;

import com.eavinlau.cube.dao.RoleDao;
import com.eavinlau.cube.pojo.DashboardRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleService {

    public static final String RES_BOARD = "board";

    @Value("${admin_user_id}")
    private String adminUserId;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private AuthenticationService authenticationService;

    public List<Long> getResRole(String resType) {
        String userid = authenticationService.getCurrentUser().getUserId();
        return roleDao.getRoleResByResIds(userid, resType);
    }

    public List<DashboardRole> getCurrentRoleList(){
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return roleDao.getRoleListAll();
        }
        return roleDao.getCurrentRoleList(userid);
    }
}
