import * as Yup from 'yup';
import { ALLOWED_DOMAINS } from '../const';
import { STRONG_PASSWORD_REQUIREMENT } from './YupShapes';

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Le mail est obligatoire')
    .email('Format de mail invalide')
    .test('is-valid-domain', 'Domaine de messagerie non autorisé', (value) =>
      ALLOWED_DOMAINS.includes(value.split('@')[1]),
    ),
  newPassword: STRONG_PASSWORD_REQUIREMENT,
  confirmPassword: STRONG_PASSWORD_REQUIREMENT.oneOf(
    [Yup.ref('newPassword')],
    'Les mots de passe ne correspondent pas.',
  ).required('Confirmez votre nouveau mot de passe.'),
});
