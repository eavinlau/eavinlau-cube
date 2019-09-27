package com.eavinlau.cube.dao;

import com.eavinlau.cube.pojo.DashboardJob;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface JobDao {
    int save(DashboardJob job);

    int update(DashboardJob job);

    List<DashboardJob> getJobList(String userId);

    List<DashboardJob> getJobListAdmin(String userId);

    int delete(Long jobId);

    int updateLastExecTime(Long jobId, Date date);

    int updateStatus(Long jobId, Long status, String log);

    DashboardJob getJob(Long jobId);

    long checkJobRole(String userId, Long jobId, String permissionPattern);

}
