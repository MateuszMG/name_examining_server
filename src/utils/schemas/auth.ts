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

const registerSchema = Yup.object({
  username,
  password,
  confirmPassword,
});

const loginSchema = Yup.object({
  username,
  password,
});

export { loginSchema, registerSchema };
