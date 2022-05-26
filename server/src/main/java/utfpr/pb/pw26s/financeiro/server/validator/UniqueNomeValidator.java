package utfpr.pb.pw26s.financeiro.server.validator;

import org.springframework.beans.factory.annotation.Autowired;
import utfpr.pb.pw26s.financeiro.server.annotation.UniqueNome;
import utfpr.pb.pw26s.financeiro.server.repository.UsuarioRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueNomeValidator implements ConstraintValidator<UniqueNome, String> {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public boolean isValid(String nome,
                           ConstraintValidatorContext constraintValidatorContext) {
        if (usuarioRepository.findByEmail(nome) == null) {
            return true;
        }
        return false;
    }
}
