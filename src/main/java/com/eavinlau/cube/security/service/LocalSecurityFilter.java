package com.eavinlau.cube.security.service;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.eavinlau.cube.cache.HeapCacheManager;
import com.eavinlau.cube.dto.User;
import com.eavinlau.cube.security.ShareAuthenticationToken;
import com.eavinlau.cube.util.ConfigurationUtil;

public class LocalSecurityFilter implements Filter {

	private static Logger logger = Logger.getLogger(LocalSecurityFilter.class);
	private static String context = "";
	private static String schema = "";

	private static long expiretime=ConfigurationUtil.getLong("mail_expiretime");
	
	private static HeapCacheManager<String> sidCache = new HeapCacheManager<>();

	public static void put(String sid, String uid) {
		sidCache.put(sid, uid, expiretime*1000);
	}

	public static String getContext() {
		return context;
	}

	public static String getSchema() {
		return schema;
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) servletRequest;
		HttpServletResponse res = (HttpServletResponse) servletResponse;
		if (StringUtils.isBlank(context) || StringUtils.isBlank(schema)) {
			context = req.getLocalPort() + req.getContextPath();
			schema = req.getScheme();
		}
		String path = req.getServletPath();
		HttpSession sesson = req.getSession();
		try {
			if ("/render.html".equals(path)) {
				String sid = req.getParameter("sid");
				if(sid!=null) {
					//如果sid不为大屏过来特定值
					if(!"elcube".equals(sid)) {
						String uid = sidCache.get(sid);
						if (StringUtils.isNotEmpty(uid)) {
							User user = new User("shareuser", "", new ArrayList<>());
							user.setUserId("1");
							SecurityContext context = SecurityContextHolder.getContext();
							context.setAuthentication(new ShareAuthenticationToken(user));
							sesson.setAttribute("SPRING_SECURITY_CONTEXT", context);
							sesson.setAttribute("render", "1");
						} else {
							sesson.removeAttribute("SPRING_SECURITY_CONTEXT");
							sesson.setAttribute("render", "0");
						}
					}
				}
				
			}
			if("/single.html".equals(path)) {
				User user = new User("shareuser", "", new ArrayList<>());
				user.setUserId("1");
				SecurityContext context = SecurityContextHolder.getContext();
				context.setAuthentication(new ShareAuthenticationToken(user));
				sesson.setAttribute("SPRING_SECURITY_CONTEXT", context);
				sesson.setAttribute("render", "1");
				
				
//				String key="datong";
//				String timestamp=req.getParameter("timestamp");
//				String fid=req.getParameter("fid");
//				String sign=req.getParameter("sign");
//				String bid=req.getParameter("bid");
//				//参数不全
//				if(timestamp==null||fid==null||sign==null) {
//					res.sendRedirect(req.getContextPath()+"/error.html");
//					return;
//				}
//				String checksign=MD5Util.GetMD5Code(key+"-"+timestamp+"-"+fid+"-"+bid);
//				//校验不通过
//				if(!sign.equals(checksign)) {
//					res.sendRedirect(req.getContextPath()+"/error.html");
//					return;
//				}else {
//					User user = new User("shareuser", "", new ArrayList<>());
//					user.setUserId("1");
//					SecurityContext context = SecurityContextHolder.getContext();
//					context.setAuthentication(new ShareAuthenticationToken(user));
//					sesson.setAttribute("SPRING_SECURITY_CONTEXT", context);
//					sesson.setAttribute("render", "1");
//				}
			}
			if ("/starter.html".equals(path) || "/".equals(path) || "".equals(path)) {
				String flag = (String) sesson.getAttribute("render");
				if ("1".equals(flag)) {
					sesson.removeAttribute("SPRING_SECURITY_CONTEXT");
					sesson.setAttribute("render", "0");
				}
			}
		} catch (Exception e) {
			logger.error(e);
		}

		filterChain.doFilter(servletRequest, servletResponse);
	}

	@Override
	public void destroy() {

	}
}
