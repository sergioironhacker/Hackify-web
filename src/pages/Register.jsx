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
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        Object.keys(values).forEach(key => data.append(key, values[key]));
        await register(data);
        navigate('/login');
      } catch (error) {
        console.error('Error registering:', error.message);
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
        <h3 className="text-green-400 uppercase font-bold text-3xl mb-6 italic">Register</h3>
        
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
            <Input
              name="avatar"
              type="file"
              label="Add your photo"
              error={touched.avatar && errors.avatar}
              onChange={(event) => {
                setFieldValue("avatar", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
          </div>
          <Button extraClassName="mt-6 w-full text-green-400" text="Create account" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}

export default Register;
