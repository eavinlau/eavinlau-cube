package com.eavinlau.cube.cache;

public interface CacheManager<T> {

    void put(String key, T data, long expire);

    T get(String key);

    void remove(String key);
}
