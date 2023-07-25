import * as Yup from 'yup';

const username = Yup.string()
  .required()
  .trim()
  .min(3)
  .max(40)
  .label('Username');

const password = Yup.string()
  .required()
  .trim()
  .min(6)
  .max(72)
  .matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/,
    'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ?',
  )
  .label('Password');

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .label('Confirmed password');

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        username:
 *          type: string
 *          default: Jone
 *        password:
 *          type: string
 *          default: StrongPassword!1
 *        passwordConfirmation:
 *          type: string
 *          default: StrongPassword!1
 *    RegisterResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 */

const registerSchema = Yup.object({
  username,
  password,
  confirmPassword,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Jone
 *        password:
 *          type: string
 *          default: StrongPassword!1
 *    LoginResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 */

const loginSchema = Yup.object({
  username,
  password,
});

export { loginSchema, registerSchema };
