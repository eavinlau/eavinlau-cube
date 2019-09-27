package com.eavinlau.cube.kylin;

import java.io.Serializable;
import java.util.HashMap;

public class TableMap extends HashMap<String, String> implements Serializable {

    @Override
    public String get(Object key) {
        return super.get(key.toString().replace("\"", ""));
    }
}