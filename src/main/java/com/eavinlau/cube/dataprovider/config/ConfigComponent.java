package com.eavinlau.cube.dataprovider.config;

import java.util.Iterator;

public abstract class ConfigComponent {

    public void add(ConfigComponent ConfigComponent) {
        throw new UnsupportedOperationException();
    }

    public void remove(ConfigComponent ConfigComponent) {
        throw new UnsupportedOperationException();
    }

    public Iterator<ConfigComponent> getIterator() {
        throw new UnsupportedOperationException();
    }

    public String getName() {
        throw new UnsupportedOperationException();
    }

    public String getDescription() {
        throw new UnsupportedOperationException();
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}
