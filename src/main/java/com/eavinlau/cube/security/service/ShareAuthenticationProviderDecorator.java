package com.eavinlau.cube.security.service;

import com.eavinlau.cube.security.ShareAuthenticationToken;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class ShareAuthenticationProviderDecorator implements AuthenticationProvider {

    private AuthenticationProvider authenticationProvider;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof ShareAuthenticationToken) {
            return authentication;
        } else {
        	Authentication auth = authenticationProvider.authenticate(authentication);
        	boolean status = auth.isAuthenticated();
            return auth;
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        if (aClass.equals(ShareAuthenticationToken.class)) {
            return true;
        } else {
            return authenticationProvider.supports(aClass);
        }
    }

    public void setAuthenticationProvider(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }
}
