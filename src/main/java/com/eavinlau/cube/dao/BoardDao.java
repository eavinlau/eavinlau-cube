package com.eavinlau.cube.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.eavinlau.cube.pojo.DashboardBoard;
import com.eavinlau.cube.pojo.DashboardBoardParam;

@Repository
public interface BoardDao {

    int save(DashboardBoard board);

    List<DashboardBoard> getBoardList(String userId);

    List<DashboardBoard> getBoardListAdmin(String userId);

    long countExistBoardName(Map<String, Object> map);

    int update(DashboardBoard board);

    int delete(Long id, String userId);

    DashboardBoard getBoard(Long id);

    long checkBoardRole(String userId, Long boardId, String permissionPattern);

    DashboardBoardParam getBoardParam(Long boardId, String userId);

    int saveBoardParam(DashboardBoardParam boardParam);

    int deleteBoardParam(Long boardId, String userId);

}
