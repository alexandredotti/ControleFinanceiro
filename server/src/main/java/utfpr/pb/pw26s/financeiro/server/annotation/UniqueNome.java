package utfpr.pb.pw26s.financeiro.server.annotation;

import utfpr.pb.pw26s.financeiro.server.validator.UniqueNomeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueNomeValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueNome {
    String message() default "{utfpr.user.nome.constraints.UniqueNome.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
