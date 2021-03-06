package com.eavinlau.cube.kylin;

import org.apache.commons.lang3.StringUtils;
import com.eavinlau.cube.dataprovider.config.DimensionConfig;
import com.eavinlau.cube.dataprovider.config.ValueConfig;
import com.eavinlau.cube.dataprovider.util.SqlSyntaxHelper;
import com.eavinlau.cube.kylin.model.KylinBaseModel;

public class KylinSyntaxHelper extends SqlSyntaxHelper {

    private KylinBaseModel kylinModel;

    public KylinSyntaxHelper(KylinBaseModel kylinModel) {
        this.kylinModel = kylinModel;
    }

    @Override
    public String getProjectStr(DimensionConfig config) {
        return kylinModel.getColumnWithAliasPrefix(config.getColumnName());
    }

    @Override
    public String getDimMemberStr(DimensionConfig config, int index) {
        if (kylinModel.getColumnType(config.getColumnName()).startsWith("varchar")) {
            return "'" + config.getValues().get(index) + "'";
        } else {
            return config.getValues().get(index);
        }
    }

    @Override
    public String getAggStr(ValueConfig vConfig) {
        String columnStr = vConfig.getColumn();
        if (columnStr.indexOf(".") != -1) {
            columnStr = StringUtils.substringAfter(vConfig.getColumn(), ".");
        }
        switch (vConfig.getAggType()) {
            case "sum":
                return "SUM(" + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS sum_" + columnStr;
            case "avg":
                return "AVG(" + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS avg_" + columnStr;
            case "max":
                return "MAX(" + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS max_" + columnStr;
            case "min":
                return "MIN(" + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS min_" + columnStr;
            case "distinct":
                return "COUNT(DISTINCT " + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS count_d_" + columnStr;
            default:
                return "COUNT(" + kylinModel.getColumnWithAliasPrefix(vConfig.getColumn()) + ") AS count_" + columnStr;
        }
    }


}