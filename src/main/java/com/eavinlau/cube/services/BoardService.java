package com.eavinlau.cube.services;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.eavinlau.cube.dao.BoardDao;
import com.eavinlau.cube.dao.WidgetDao;
import com.eavinlau.cube.dto.ViewDashboardBoard;
import com.eavinlau.cube.dto.ViewDashboardWidget;
import com.eavinlau.cube.pojo.DashboardBoard;
import com.eavinlau.cube.pojo.DashboardWidget;

@Repository
public class BoardService {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private BoardDao boardDao;

    @Autowired
    private WidgetDao widgetDao;

    public List<DashboardBoard> getBoardList(String userId) {
        return boardDao.getBoardList(userId);
    }

    public ViewDashboardBoard getBoardData(Long id) {
        DashboardBoard board = boardDao.getBoard(id);
        JSONObject layout = JSONObject.parseObject(board.getLayout());
        JSONArray rows = layout.getJSONArray("rows");
        for (Object row : rows) {
            JSONObject o = (JSONObject) row;
            if ("param".equals(o.getString("type"))) {
                layout.put("containsParam", true);
                continue;
            }
            JSONArray widgets = o.getJSONArray("widgets");
            if(widgets == null){
                break;
            }
            for (Object w : widgets) {
                JSONObject ww = (JSONObject) w;
                Long widgetId = ww.getLong("widgetId");
                DashboardWidget widget = widgetDao.getWidget(widgetId);
                //DataProviderResult data = dataProviderService.getData(dataJson.getLong("datasource"), Maps.transformValues(dataJson.getJSONObject("query"), Functions.toStringFunction()));
                JSONObject widgetJson = (JSONObject) JSONObject.toJSON(new ViewDashboardWidget(widget));
                //widgetJson.put("queryData", data.getData());
                ww.put("widget", widgetJson);
                ww.put("show", false);
            }
        }
        ViewDashboardBoard view = new ViewDashboardBoard(board);
        view.setLayout(layout);
        return view;
    }

    public ServiceStatus save(String userId, String json) {
        JSONObject jsonObject = JSONObject.parseObject(json);
        DashboardBoard board = new DashboardBoard();
        board.setUserId(userId);
        board.setName(jsonObject.getString("name"));
        board.setCategoryId(jsonObject.getLong("categoryId"));
        board.setLayout(jsonObject.getString("layout"));

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("user_id", board.getUserId());
        paramMap.put("board_name", board.getName());
        if (boardDao.countExistBoardName(paramMap) <= 0) {
            boardDao.save(board);
            return new ServiceStatus(ServiceStatus.Status.Success, "success", board.getId());
        } else {
            return new ServiceStatus(ServiceStatus.Status.Fail, "Duplicated name");
        }
    }

    public ServiceStatus update(String userId, String json) {
        JSONObject jsonObject = JSONObject.parseObject(json);
        DashboardBoard board = new DashboardBoard();
        board.setUserId(userId);
        board.setName(jsonObject.getString("name"));
        board.setCategoryId(jsonObject.getLong("categoryId"));
        board.setLayout(jsonObject.getString("layout"));
        board.setId(jsonObject.getLong("id"));
        board.setUpdateTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));


        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("board_id", board.getId());
        paramMap.put("user_id", board.getUserId());
        paramMap.put("board_name", board.getName());
        if (boardDao.countExistBoardName(paramMap) <= 0) {
            boardDao.update(board);
            return new ServiceStatus(ServiceStatus.Status.Success, "success");
        } else {
            return new ServiceStatus(ServiceStatus.Status.Fail, "Duplicated name");
        }
    }

    public ServiceStatus delete(String userId, Long id) {
        try {
            boardDao.delete(id, userId);
            return new ServiceStatus(ServiceStatus.Status.Success, "success");
        } catch (Exception e) {
            LOG.error("", e);
            return new ServiceStatus(ServiceStatus.Status.Fail, e.getMessage());
        }
    }

}
