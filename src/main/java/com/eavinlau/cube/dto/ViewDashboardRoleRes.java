package com.eavinlau.cube.dto;

import com.eavinlau.cube.pojo.DashboardRoleRes;
import com.eavinlau.cube.services.role.RolePermission;

public class ViewDashboardRoleRes {

    private Long roleResId;
    private String roleId;
    private Long resId;
    private String resType;
    private boolean edit;
    private boolean delete;


    public ViewDashboardRoleRes(DashboardRoleRes dashboardRoleRes) {
        this.roleResId = dashboardRoleRes.getRoleResId();
        this.roleId = dashboardRoleRes.getRoleId();
        this.resId = dashboardRoleRes.getResId();
        this.resType = dashboardRoleRes.getResType();
        this.edit = RolePermission.isEdit(dashboardRoleRes.getPermission());
        this.delete = RolePermission.isDelete(dashboardRoleRes.getPermission());
    }

    public boolean isEdit() {
        return edit;
    }

    public void setEdit(boolean edit) {
        this.edit = edit;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    public Long getRoleResId() {
        return roleResId;
    }

    public void setRoleResId(Long roleResId) {
        this.roleResId = roleResId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public Long getResId() {
        return resId;
    }

    public void setResId(Long resId) {
        this.resId = resId;
    }

    public String getResType() {
        return resType;
    }

    public void setResType(String resType) {
        this.resType = resType;
    }
}
