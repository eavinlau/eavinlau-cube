package com.eavinlau.cube.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eavinlau.cube.dto.DashboardMenu;
import com.eavinlau.cube.dto.User;
import com.eavinlau.cube.services.AdminSerivce;
import com.eavinlau.cube.services.MenuService;
import com.eavinlau.cube.services.ServiceStatus;

@RestController
@RequestMapping("/commons")
public class CommonsController extends BaseController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private AdminSerivce adminSerivce;

    @RequestMapping(value = "/getUserDetail")
    public User getUserDetail() {
        return authenticationService.getCurrentUser();
    }

    @RequestMapping(value = "/getMenuList")
    public List<DashboardMenu> getMenuList() {
        return menuService.getMenuList();
    }

    @RequestMapping(value = "/changePwd")
    public ServiceStatus changePwd(@RequestParam(name = "curPwd") String curPwd, @RequestParam(name = "newPwd") String newPwd, @RequestParam(name = "cfmPwd") String cfmPwd) {
        return adminSerivce.changePwd(tlUser.get().getUserId(), curPwd, newPwd, cfmPwd);
    }

}
