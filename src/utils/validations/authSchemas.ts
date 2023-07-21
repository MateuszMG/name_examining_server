import { joi } from './joiInstance';

const joiSchemas = {
  username: joi.string().required().trim().min(3).max(40).label('Username'),
  password: joi
    .string()
    .required()
    .trim()
    .min(6)
    .max(72)
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/)
    .message(
      `Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ? `,
    )
    .label('Password'),
};

const registerSchema = joi.object({
  username: joiSchemas.username,
  password: joiSchemas.password,
  confirmPassword: joi
    .valid(joi.ref('password'))
    .error(() => new Error('Passwords must match')),
});

const loginSchema = joi.object({
  username: joiSchemas.username,
  password: joiSchemas.password,
});

export { loginSchema, registerSchema };
