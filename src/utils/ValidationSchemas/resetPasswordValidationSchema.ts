import * as Yup from 'yup';
import { STRONG_PASSWORD_REQUIREMENT } from './YupShapes';

export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: STRONG_PASSWORD_REQUIREMENT,
  confirmPassword: STRONG_PASSWORD_REQUIREMENT.oneOf(
    [Yup.ref('newPassword')],
    'Les mots de passe ne correspondent pas.',
  ).required('Confirmez votre nouveau mot de passe.'),
});
