import * as Yup from 'yup';

export const STRONG_PASSWORD_REQUIREMENT = Yup.string()
  .min(8, 'Minimum 8 caractères.')
  .required('Entrez un nouveau mot de passe.')
  .matches(/^(?=.*[a-z])/, 'Minimum une minuscule.')
  .matches(/^(?=.*[A-Z])/, 'Minimum une majuscule.')
  .matches(/^(?=.*[0-9])/, 'Minimum un chiffre.')
  .matches(/^(?=.*[$&+,:;=?@#|'<>.^*()%!-])/, 'Minimum un caractère spécial.');
