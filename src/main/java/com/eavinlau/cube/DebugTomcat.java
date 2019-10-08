package com.eavinlau.cube;

import java.io.File;

import org.apache.catalina.core.AprLifecycleListener;
import org.apache.catalina.core.StandardServer;
import org.apache.catalina.startup.Tomcat;

public class DebugTomcat {

    public static void main(String[] args) throws Exception {

        int port = 9090;
        if (args.length >= 1) {
            port = Integer.parseInt(args[0]);
        }

        String webBase = new File("src/main/webapp").getAbsolutePath();
        System.out.println(webBase);
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(port);
        tomcat.setBaseDir(".");

        StandardServer server = (StandardServer) tomcat.getServer();
        AprLifecycleListener listener = new AprLifecycleListener();
        server.addLifecycleListener(listener);

        tomcat.addWebapp("/eavinlau-cube", webBase);
        tomcat.start();
        tomcat.getServer().await();
    }

}
