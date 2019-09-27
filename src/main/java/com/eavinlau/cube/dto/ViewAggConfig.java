package com.eavinlau.cube.dto;

import com.eavinlau.cube.dataprovider.config.AggConfig;
import com.eavinlau.cube.dataprovider.config.ConfigComponent;
import com.eavinlau.cube.dataprovider.config.DimensionConfig;
import com.eavinlau.cube.dataprovider.config.ValueConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ViewAggConfig {

    private List<DimensionConfig> rows;
    private List<DimensionConfig> columns;
    private List<DimensionConfig> filters;
    private List<ValueConfig> values;

    public static AggConfig getAggConfig(ViewAggConfig viewAggConfig) {
        if (viewAggConfig != null) {
            AggConfig aggConfig = new AggConfig();
            aggConfig.setRows(viewAggConfig.getRows());
            aggConfig.setColumns(viewAggConfig.getColumns());
            if (viewAggConfig.getFilters() != null) {
                aggConfig.setFilters(viewAggConfig.getFilters().stream().map(e -> (ConfigComponent) e).collect(Collectors.toList()));
            } else {
                aggConfig.setFilters(new ArrayList<>());
            }
            aggConfig.setValues(viewAggConfig.getValues());
            return aggConfig;
        }
        return null;
    }

    public List<DimensionConfig> getRows() {
        return rows;
    }

    public void setRows(List<DimensionConfig> rows) {
        this.rows = rows;
    }

    public List<DimensionConfig> getColumns() {
        return columns;
    }

    public void setColumns(List<DimensionConfig> columns) {
        this.columns = columns;
    }

    public List<DimensionConfig> getFilters() {
        return filters;
    }

    public void setFilters(List<DimensionConfig> filters) {
        this.filters = filters;
    }

    public List<ValueConfig> getValues() {
        return values;
    }

    public void setValues(List<ValueConfig> values) {
        this.values = values;
    }
}
