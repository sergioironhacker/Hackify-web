import { useFormik } from 'formik';
import Input from "../components/Input";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService';
import { object, string, mixed } from 'yup';
import AboutUsLogo from '../assets/AboutUsLogo'; // Importa el componente del logo

const userSchema = object({
  username: string().required('Required field'),
  email: string().email('Enter a valid email').required('Required field'),
  password: string().min(8, 'Password of at least 8 characters').required('Required field'),
  avatar: mixed().required('Required field')
});

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, touched, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      avatar: ''
    },
    onSubmit: async (values, { setFieldError }) => {
      try {
        const data = new FormData();
        Object.keys(values).forEach(key => data.append(key, values[key]));
        await register(data);
        navigate('/login');
      } catch (error) {
        if (error.response) {
          // Si la respuesta contiene errores de validación del formulario, establece los errores de campo correspondientes
          if (error.response.data.errors) {
            error.response.data.errors.forEach(({ field, message }) => {
              setFieldError(field, message);
            });
          } else {
            // Si hay otros errores, muestra un mensaje genérico
            console.error('Error registering:', error.response.data.message);
          }
        } else {
          console.error('Error registering:', error.message);
        }
      }
    },
    validationSchema: userSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="flex justify-center items-center h-screen text-green-400">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="flex justify-center text-2xl font-bold text-green-400 mb-4 ">
          Hackify <AboutUsLogo />
        </h1>
        <h3 className="text-center text-green-400 uppercase font-bold text-3xl mb-6 italic">Register</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <Input
              name="username"
              label="User name"
              placeholder="Ex: 'Example'"
              value={values.username}
              error={touched.username && errors.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Ex: 'Example@gmail.com'"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Ex: '11223344'"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="flex items-center">
              <label htmlFor="avatar" className="block text-sm font-medium text-green-400 mr-2">
                Add your photo:
              </label>
              <label htmlFor="avatar" className="cursor-pointer bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Upload
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                style={{ display: "none" }}
                onBlur={handleBlur}
                onChange={(event) => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
            </div>
          </div>
          <Button extraClassName="mt-6 w-full text-green-400" text="Create account" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}

export default Register;
