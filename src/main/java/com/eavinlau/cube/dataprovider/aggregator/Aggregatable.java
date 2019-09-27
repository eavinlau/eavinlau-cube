package com.eavinlau.cube.dataprovider.aggregator;

import com.eavinlau.cube.dataprovider.config.AggConfig;
import com.eavinlau.cube.dataprovider.result.AggregateResult;

public interface Aggregatable {

    String[] queryDimVals(String columnName, AggConfig config) throws Exception;

    String[] getColumn() throws Exception;

    AggregateResult queryAggData(AggConfig ac) throws Exception;

    default String viewAggDataQuery(AggConfig ac) throws Exception {
        return "Not Support";
    }

}
