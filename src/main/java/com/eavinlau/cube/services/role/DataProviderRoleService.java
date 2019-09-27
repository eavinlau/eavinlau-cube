package com.eavinlau.cube.services.role;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import com.eavinlau.cube.dao.DatasetDao;
import com.eavinlau.cube.dao.DatasourceDao;
import com.eavinlau.cube.dao.RoleDao;
import com.eavinlau.cube.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Repository;

@Repository
@Aspect
@Order(2)
public class DataProviderRoleService {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private DatasourceDao datasourceDao;

    @Autowired
    private DatasetDao datasetDao;

    @Value("${admin_user_id}")
    private String adminUserId;

    @Around("execution(* com.eavinlau.cube.services.DataProviderService.getDimensionValues(..)) ||" +
            "execution(* com.eavinlau.cube.services.DataProviderService.getColumns(..)) ||" +
            "execution(* com.eavinlau.cube.services.DataProviderService.queryAggData(..)) ||" +
            "execution(* com.eavinlau.cube.services.DataProviderService.viewAggDataQuery(..))")
    public Object query(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Long datasourceId = (Long) proceedingJoinPoint.getArgs()[0];
        Long datasetId = (Long) proceedingJoinPoint.getArgs()[2];
        String userid = authenticationService.getCurrentUser().getUserId();
        if (datasetId != null) {
            if (datasetDao.checkDatasetRole(userid, datasetId, RolePermission.PATTERN_READ) > 0) {
                return proceedingJoinPoint.proceed();
            }
        } else {
            if (datasourceDao.checkDatasourceRole(userid, datasourceId, RolePermission.PATTERN_READ) > 0) {
                return proceedingJoinPoint.proceed();
            }
        }
        return null;
    }

}
