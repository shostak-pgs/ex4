package org.java.training.helpdesk.config.security;

import org.java.training.helpdesk.exception.FilterException;
import org.java.training.helpdesk.utils.JwtUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {
    private static final String AUTH = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String EMPTY = "";

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtils jwtUtils;

    public JWTFilter(CustomUserDetailsService customUserDetailsService, JwtUtils jwtUtils) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest httpServletRequest,
                                    @NotNull HttpServletResponse httpServletResponse,
                                    @NotNull FilterChain filterChain) throws ServletException {
        String username = EMPTY;
        String jwt = getToken(httpServletRequest);
        if(jwt != null) {
            username = jwtUtils.extractUsername(jwt);
        }

        if(!username.equals(EMPTY) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            if(jwtUtils.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken newToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                newToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
            SecurityContextHolder.getContext().setAuthentication(newToken);
            }
        } try {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (IOException ex){
            throw new FilterException("IOException in filter chain occurred");
        }
    }

    private String getToken(HttpServletRequest request) {
       String authHeader = request.getHeader(AUTH);

        if(authHeader != null && authHeader.startsWith(BEARER)) {
            return authHeader.replace(BEARER, EMPTY);
        }
        return null;
    }
}