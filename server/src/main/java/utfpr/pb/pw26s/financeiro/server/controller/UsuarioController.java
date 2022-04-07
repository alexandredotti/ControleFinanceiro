package utfpr.pb.pw26s.financeiro.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import utfpr.pb.pw26s.financeiro.server.error.ApiError;
import utfpr.pb.pw26s.financeiro.server.model.Usuario;
import utfpr.pb.pw26s.financeiro.server.service.UsuarioService;
import utfpr.pb.pw26s.financeiro.server.shared.GenericResponse;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    GenericResponse novoUsuario(@Valid @RequestBody Usuario usuario){
        usuarioService.save(usuario);
        return new GenericResponse("Registro salvo");
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handlerValidationException(MethodArgumentNotValidException exception,
                                        HttpServletRequest request) {
        Map<String, String> validationErrors = new HashMap<>();

        for(FieldError error: exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        }

        return new ApiError(HttpStatus.BAD_REQUEST.value(), "validation error",
                request.getServletPath(), validationErrors);
    }
}
