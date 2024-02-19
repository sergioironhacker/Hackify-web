
import Input from '../components/Input';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import '../App.css'

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const userSchema = object({
        username: string().required('Username is required'),
        password: string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values) => {
            login(values)
        .then(() => navigate('/'))
        },
        validationSchema: userSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
    });

    console.log(errors)

    return (
        <form onSubmit={handleSubmit}>
            <div className="card-front">
                <div className="center-wrap">
                    <div className="section text-center">
                        <div className="form-group">
                            <Input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.username && errors.username}
                                label="Username"
                                value={values.username}
                                name="username"
                                type="text"
                                placeholder="Username"
                                icon="uil uil-at"
                            />
                        </div>
                        <div className="form-group mt-2">
                            <Input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && errors.password}
                                label="Password"
                                value={values.password}
                                name="password"
                                type="password"
                                placeholder="Password"
                                icon="uil uil-lock-alt"
                            />
                        </div>
                        <Button  /* disabled={!isValid} */ type="submit" text="Login" />
                        <p className="mb-0 mt-4 text-center"><a href="#">Forgot your password?</a></p>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;
