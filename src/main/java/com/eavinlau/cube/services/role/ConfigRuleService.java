package com.eavinlau.cube.services.role;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.eavinlau.cube.dao.BoardDao;
import com.eavinlau.cube.dao.DatasetDao;
import com.eavinlau.cube.dao.MenuDao;
import com.eavinlau.cube.dao.RoleDao;
import com.eavinlau.cube.dao.WidgetDao;
import com.eavinlau.cube.pojo.DashboardRole;
import com.eavinlau.cube.services.AuthenticationService;
import com.google.common.base.Function;
import com.google.common.collect.Lists;

@Repository
@Aspect
@Order(2)
public class ConfigRuleService {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private MenuDao menuDao;

    @Autowired
    private RoleDao roleDao;

    @Value("${admin_user_id}")
    private String adminUserId;

    @Autowired
    private DatasetDao datasetDao;

    @Autowired
    private WidgetDao widgetDao;

    @Autowired
    private BoardDao boardDao;

    @Around("execution(* com.eavinlau.cube.services.WidgetService.save(..)) || " +
            "execution(* com.eavinlau.cube.services.WidgetService.update(..)) || " +
            "execution(* com.eavinlau.cube.services.WidgetService.delete(..))")
    public Object widgetRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(1L) && menuIdList.contains(4L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.DatasetService.save(..)) || " +
            "execution(* com.eavinlau.cube.services.DatasetService.update(..)) || " +
            "execution(* com.eavinlau.cube.services.DatasetService.delete(..))")
    public Object datasetRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(1L) && menuIdList.contains(3L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.DatasourceService.save(..)) || " +
            "execution(* com.eavinlau.cube.services.DatasourceService.update(..)) || " +
            "execution(* com.eavinlau.cube.services.DatasourceService.delete(..))")
    public Object datasourceRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(1L) && menuIdList.contains(2L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.BoardService.save(..)) || " +
            "execution(* com.eavinlau.cube.services.BoardService.update(..)) || " +
            "execution(* com.eavinlau.cube.services.BoardService.delete(..))")
    public Object boardRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(1L) && menuIdList.contains(5L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.CategoryService.save(..)) || " +
            "execution(* com.eavinlau.cube.services.CategoryService.update(..)) || " +
            "execution(* com.eavinlau.cube.services.CategoryService.delete(..))")
    public Object categoryRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(1L) && menuIdList.contains(6L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.AdminSerivce.addUser(..)) || " +
            "execution(* com.eavinlau.cube.services.AdminSerivce.updateUser(..)))")
    public Object userAdminRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.AdminSerivce.addRole(..)) || " +
            "execution(* com.eavinlau.cube.services.AdminSerivce.updateRole(..)) || " +
            "execution(* com.eavinlau.cube.services.AdminSerivce.updateRoleRes(..))")
    public Object resAdminRule(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<Long> menuIdList = menuDao.getMenuIdByUserRole(userid);
            if (menuIdList.contains(7L) && menuIdList.contains(8L)) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.AdminSerivce.updateRole(..))")
    public Object updateRole(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            DashboardRole role = roleDao.getRole((String) proceedingJoinPoint.getArgs()[0]);
            if (userid.equals(role.getUserId())) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

    @Around("execution(* com.eavinlau.cube.services.AdminSerivce.updateUserRole(..)) ||" +
            "execution(* com.eavinlau.cube.services.AdminSerivce.deleteUserRoles(..))")
    public Object updateUserRole(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed();
        } else {
            List<String> roleId = Lists.transform(roleDao.getRoleList(userid), new Function<DashboardRole, String>() {
                @Nullable
                @Override
                public String apply(@Nullable DashboardRole role) {
                    return role.getRoleId();
                }
            });
            Object[] args = proceedingJoinPoint.getArgs();
            String[] argRoleId = (String[]) args[1];
            roleId.retainAll(Arrays.asList(argRoleId));
            args[1] = roleId.toArray(new String[]{});
            return proceedingJoinPoint.proceed(args);
        }
    }

    @Around("execution(* com.eavinlau.cube.services.AdminSerivce.updateRoleResUser(..))")
    public Object updateRoleResUser(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String userid = authenticationService.getCurrentUser().getUserId();
        if (userid.equals(adminUserId)) {
            return proceedingJoinPoint.proceed(proceedingJoinPoint.getArgs());
        } else {
            Object[] args = proceedingJoinPoint.getArgs();
            JSONArray arr = JSONArray.parseArray(args[1].toString());
            List<Object> filtered = arr.stream().filter(e -> {
                JSONObject jo = (JSONObject) e;
                switch (jo.getString("resType")) {
                    case "widget":
                        return widgetDao.checkWidgetRole(userid, jo.getLong("resId"), RolePermission.PATTERN_READ) > 0;
                    case "dataset":
                        return datasetDao.checkDatasetRole(userid, jo.getLong("resId"), RolePermission.PATTERN_READ) > 0;
                    case "board":
                        return boardDao.checkBoardRole(userid, jo.getLong("resId"), RolePermission.PATTERN_READ) > 0;
                    default:
                        return false;
                }
            }).collect(Collectors.toList());
            args[1] = JSONArray.toJSON(filtered).toString();
            return proceedingJoinPoint.proceed(args);
        }
    }
}
