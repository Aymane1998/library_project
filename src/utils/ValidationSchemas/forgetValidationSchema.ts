import * as Yup from 'yup';

export const forgetValidationSchema = Yup.object().shape({
  username: Yup.string().required('Le nom ou le mail est obligatoire'),
});
