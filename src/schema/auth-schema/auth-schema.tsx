import { ValidationMessages } from '../../constants/formConst';
import { emailRegex } from '../../constants/regex-constant';
import * as yup from 'yup';

export const LoginPageSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(ValidationMessages.EmailRequired)
    .transform(value => value?.toLowerCase())
    .matches(emailRegex, {
      message: ValidationMessages.ValidEmailRequired,
    })
    .required(ValidationMessages.ValidEmailRequired)
    .max(255, ValidationMessages.EmailMaxLength),
  password: yup.string().required(ValidationMessages.PasswordRequired),
});

export const EnterOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .required(ValidationMessages.OtpRequired)
    .length(6, ValidationMessages.OtpLength)
    .matches(/^\d{6}$/, ValidationMessages.OtpInvalid),

  username: yup
    .string()
    .required(ValidationMessages.EmailRequired)
    .transform(value => value?.toLowerCase())
    .matches(emailRegex, {
      message: ValidationMessages.ValidEmailRequired,
    })
    .max(255, ValidationMessages.EmailMaxLength),
});

export const SetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(ValidationMessages.NewPasswordRequired)
    .min(6, ValidationMessages.PasswordMinLength),
  confirmPassword: yup
    .string()
    .required(ValidationMessages.ConfirmPasswordRequired)
    .oneOf([yup.ref('newPassword')], ValidationMessages.PasswordsMustMatch),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required(ValidationMessages.EmailRequired)
    .transform(value => value?.toLowerCase())
    .matches(emailRegex, {
      message: ValidationMessages.ValidEmailRequired,
    })
    .required(ValidationMessages.ValidEmailRequired)
    .max(255, ValidationMessages.EmailMaxLength),
});
