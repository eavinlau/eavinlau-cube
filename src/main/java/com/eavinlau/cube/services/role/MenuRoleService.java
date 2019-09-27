package com.eavinlau.cube.services.role;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import com.eavinlau.cube.dao.MenuDao;
import com.eavinlau.cube.dto.DashboardMenu;
import com.eavinlau.cube.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;

@Repository
@Aspect
public class MenuRoleService {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private MenuDao menuDao;

    @Value("${admin_user_id}")
    private String adminUserId;

    @Around("execution(* com.eavinlau.cube.services.MenuService.getMenuList(..))")
    public Object getMenuList(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            final List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            List<DashboardMenu> list = (List<DashboardMenu>) proceedingJoinPoint.proceed();
            return new ArrayList<DashboardMenu>(Collections2.filter(list, new Predicate<DashboardMenu>() {
                @Override
                public boolean apply(@Nullable DashboardMenu dashboardMenu) {
                    return menuIdList.contains(dashboardMenu.getMenuId());
                }
            }));
        }
    }

}
