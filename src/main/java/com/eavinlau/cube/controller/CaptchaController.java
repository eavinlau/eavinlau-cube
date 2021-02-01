package com.eavinlau.cube.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.eavinlau.cube.util.VerifyCodeUtils;

@Controller
@RequestMapping("/captcha")
public class CaptchaController {
	
	 @RequestMapping("/getCaptchaCode")
	    public ModelAndView getCaptchaCode(HttpServletRequest request, HttpServletResponse response) throws IOException{
	        HttpSession session = request.getSession();
	        
	        response.setDateHeader("Expires", 0);  
	        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
	        response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
	        response.setHeader("Pragma", "no-cache");  
	        response.setContentType("image/jpeg"); 
	        
	        //生成验证码文本
	        String verifyCode = VerifyCodeUtils.generateVerifyCode(4); 
	        session.setAttribute("login_verifyCode", verifyCode);
	        /*System.out.println("生成验证码文本===="+capText);*/
	        //利用生成的字符串构建图片
	        BufferedImage bi = VerifyCodeUtils.outputImage(125, 45, verifyCode);
	        ServletOutputStream out = response.getOutputStream();  
	        ImageIO.write(bi, "jpg", out);  
	        try {  
	            out.flush();  
	        } finally {  
	            out.close();  
	        }
	        return null;
	    }
	    
	    /**
	     *             
	     *                前端输入的验证码与生成的对比
	     * @author         ccg
	     * @param         request
	     * @param         response
	     * @param         captchaCode
	     * Created        2017年1月17日 下午5:34:23
	     */
	    @RequestMapping("/checkCaptchaCode")
	    public void checkCaptchaCode(HttpServletRequest request, HttpServletResponse response,@RequestParam("captchaCode") String captchaCode){
	        /*System.out.println("页面输入验证码===="+captchaCode);*/
	        
	        response.setCharacterEncoding("UTF-8");
	        response.setHeader("Pragma", "No-cache");
	        response.setHeader("Cache-Control", "no-cache");
	        response.setDateHeader("Expires", 0);
	        
	        String generateCode = ((String) request.getSession().getAttribute("login_verifyCode")).toLowerCase();
	        String result = "";
	        if(generateCode.equals(captchaCode.toLowerCase())){
	            result = "ok";
	        }else{
	            result = "error";
	        }
	        PrintWriter out = null;
	        try {
	            out = response.getWriter();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        out.print(result);
	        out.flush();
	    }

}
