import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input";
import Button from "../components/Button";
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AboutUsLogo from "../assets/AboutUsLogo";

const userSchema = object({
  email: string().email('Introduce un email válido').required('Campo requerido'),
  password: string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo requerido')
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      setLoading(true); 
      try {
        await login(values);
       
        setTimeout(() => {
          setLoading(false); 
          navigate('/profile');
        }, 2000);
      } catch (error) {
        setLoading(false); 
        setError('Email o contraseña incorrectos');
      }
    },
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold text-green-400 mr-2">Hackify</h1>
          <AboutUsLogo />
        </div>
        <h1 className="text-center text-green-400 uppercase font-bold text-3xl mb-6">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 text-green-400">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="hey@hola.com"
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              textClassName="text-green-400"
              extraClassName="border-green-400 focus:border-green-400"
            />
            <Input
              name="password"
              type="password"
              label="Contraseña"
              placeholder="*********"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              textClassName="text-green-400"
              extraClassName="border-green-400 focus:border-green-400"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button extraClassName="mt-6 bg-green-400" disabled={!isValid || loading} text={loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Accede"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
