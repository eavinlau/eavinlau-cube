package com.eavinlau.cube.util;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigurationUtil {
	
	private final static Logger LOG = Logger.getLogger(ConfigurationUtil.class);
	
	private static Properties prop = new Properties();
	
	static {
		try {
			InputStream in = ConfigurationUtil.class.getResourceAsStream("/config.properties"); 
			prop.load(in);  
		} catch (Exception e) {
			LOG.error(e);
		}
	}
	
	public static String getProperty(String key) {
		return prop.getProperty(key);
	}
	
	/**
	 * 获取整数类型的配置项
	 * @param key
	 * @return value
	 */
	public static Integer getInteger(String key) {
		String value = getProperty(key);
		try {
			return Integer.valueOf(value);
		} catch (Exception e) {
			LOG.error(e);
		}
		return 0;
	}
	
	/**
	 * 获取布尔类型的配置项
	 * @param key
	 * @return value
	 */
	public static Boolean getBoolean(String key) {
		String value = getProperty(key);
		try {
			return Boolean.valueOf(value);
		} catch (Exception e) {
			LOG.error(e);
		}
		return false;
	}
	
	/**
	 * 获取Long类型的配置项
	 * @param key
	 * @return
	 */
	public static Long getLong(String key) {
		String value = getProperty(key);
		try {
			return Long.valueOf(value);
		} catch (Exception e) {
			LOG.error(e);
		}
		return 0L;
	}
	
	public static void main(String[] args) {
		System.out.println(getProperty("jdbc.password"));
	}
}
