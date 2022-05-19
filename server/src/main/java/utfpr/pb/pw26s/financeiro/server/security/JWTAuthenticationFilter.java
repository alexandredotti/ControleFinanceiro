package utfpr.pb.pw26s.financeiro.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static org.springframework.security.config.Elements.JWT;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;
    private AuthUsuarioService authUsuarioService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,
                                   ApplicationContext ctx) {
        this.authenticationManager = authenticationManager;
        this.authUsuarioService = ctx.getBean(AuthUsuarioService.class);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Usuario credentials = new ObjectMapper().readValue(
                    request.getInputStream(), Usuario.class);
            Usuario usuario = (Usuario)
                    authUsuarioService.loadUserByUsername(credentials.getNome());


            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getNome(),
                            credentials.getSenha(),
                            usuario.getAuthorities()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(authResult.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() +
                        SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
        response.setContentType("application/json");
        response.getWriter().write(
                new ObjectMapper().writeValueAsString(
                        new AuthenticationResponse(token))
        );
    }

    @Override
    protected AuthenticationSuccessHandler getSuccessHandler() {
        return super.getSuccessHandler();
    }
}