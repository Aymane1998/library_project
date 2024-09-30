import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Le nom est obligatoire'),
  password: Yup.string().required('Le mot de passe est obligatoire'),
});
