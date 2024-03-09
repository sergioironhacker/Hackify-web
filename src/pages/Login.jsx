import { useFormik } from 'formik';
import Input from "../components/Input";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import AboutUsLogo from '../assets/AboutUsLogo'; // Importa el componente del logo

const userSchema = object({
  email: string().email('Enter a valid email').required('Required field'),
  password: string().min(8, 'Password of at least 8 characters').required('Required field')
});

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        // Lógica de inicio de sesión
        navigate('/profile');
      } catch (error) {
        console.error('Error logging in:', error.message);
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
        <h3 className="text-green-400 uppercase font-bold text-3xl mb-6 italic">Login</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Ex: 'example@example.com'"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Ex: '********'"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <Button extraClassName="mt-6 w-full text-green-400" text="Sign in" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}

export default Login;
