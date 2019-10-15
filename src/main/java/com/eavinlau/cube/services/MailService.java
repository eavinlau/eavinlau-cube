package com.eavinlau.cube.services;

import java.net.InetAddress;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.HtmlEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.eavinlau.cube.dao.BoardDao;
import com.eavinlau.cube.pojo.DashboardJob;
import com.eavinlau.cube.security.service.LocalSecurityFilter;
import com.eavinlau.cube.util.ConfigurationUtil;

@Service
public class MailService {

    private Logger LOG = LoggerFactory.getLogger(this.getClass());

    @Autowired
    BoardDao boardDao;

    @Value("${mail.smtp.host}")
    private String mail_smtp_host;

    @Value("${mail.smtp.port}")
    private Integer mail_smtp_port;

    @Value("${mail.smtp.username:#{null}}")
    private String mail_smtp_username;

    @Value("${mail.smtp.password:#{null}}")
    private String mail_smtp_password;

    @Value("${mail.smtp.from}")
    private String mail_smtp_from;

    @Value("${mail.smtp.ssl.checkserveridentity:false}")
    private Boolean mail_smtp_ssl_check;

    @Value("${mail.smtp.ssl.startTLSEnabled:false}")
    private Boolean mail_smtp_start_tls_enabled;
    
    public String sendDashboard(DashboardJob job) throws Exception {
        JSONObject config = JSONObject.parseObject(job.getConfig());

        HtmlEmail email = new HtmlEmail();

        StringBuffer sb = new StringBuffer("<html><h3>"+ConfigurationUtil.getProperty("mail_message")+"</h3>");
        
        InetAddress address = InetAddress.getLocalHost();
        String hostAddress = address.getHostAddress();
        JSONArray boards = config.getJSONArray("boards");
        
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        
        for(Object json:boards) {
        	JSONObject obj = (JSONObject)json;
        	String sid =uuid+"_"+obj.getString("id");
        	String url = new StringBuffer(LocalSecurityFilter.getSchema())
        			.append("://"+hostAddress+":")
        			.append(LocalSecurityFilter.getContext())
        			.append("/single.html#/mine/")
        			.append(obj.getString("id"))
        			.toString();
        	LOG.info(url);
        	LocalSecurityFilter.put(sid, job.getUserId());
        	sb.append("<a href=").append(url).append(">"+boardDao.getBoard(obj.getLong("id")).getName()+"</a><br />");
        }
        sb.append("</html>");
        email.addPart(sb.toString(), "text/html;charset=utf-8");
        email.setHtmlMsg(sb.toString());
        email.setTextMsg(sb.toString());
        email.setHostName(mail_smtp_host);
        email.setSmtpPort(mail_smtp_port);
        email.setSSLCheckServerIdentity(mail_smtp_ssl_check);
        email.setStartTLSEnabled(mail_smtp_start_tls_enabled);
        if (mail_smtp_username != null && mail_smtp_password != null) {
            email.setAuthentication(mail_smtp_username, mail_smtp_password);
        }
        email.setFrom(mail_smtp_from);
        email.setSubject(config.getString("subject"));
        String to = config.getString("to");
        if (StringUtils.isNotBlank(to)) {
            if (to.contains(";")) {
                email.addTo(to.split(";"));
            } else {
                email.addTo(to);
            }
        }
        String cc = config.getString("cc");
        if (StringUtils.isNotBlank(cc)) {
            if (cc.contains(";")) {
                email.addCc(cc.split(";"));
            } else {
                email.addCc(cc);
            }
        }
        String bcc = config.getString("bcc");
        if (StringUtils.isNotBlank(bcc)) {
            if (bcc.contains(";")) {
                email.addBcc(bcc.split(";"));
            } else {
                email.addBcc(bcc);
            }
        }
        email.send();
        return null;
    }

}
