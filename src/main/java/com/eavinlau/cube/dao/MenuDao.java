package com.eavinlau.cube.dao;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao {
    List<Long> getMenuIdByUserRole(String userId);

    List<Long> getMenuIdByRoleAdmin(String userId);
}
