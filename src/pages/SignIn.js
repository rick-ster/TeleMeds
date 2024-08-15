import React, { useState } from 'react';
import Typewriter from "typewriter-effect";
import '../CSS/GetStarted.css';
import usePasswordToggle from '../components/visPassToggle';
import { Link, useNavigate } from 'react-router-dom';  
import '../CSS/Form.css';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/LoginSchema';

const initialValues = {
    email: "",
    password: "",
};

const SignIn = () => {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate(); 

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    const userId = data.userId; 
                    if (userId) {
                        navigate(`/profile/${userId}`);
                    } else {
                        setServerError('User ID not found in response.');
                    }
                } else {
                    setServerError(data.message || 'Login failed. Please try again.');
                }
                
            } catch (error) {
                console.error('Error:', error);
                setServerError('An error occurred. Please try again.');
            }
        },
    });

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    return (
        <div className='log'>
            <div className="left" id='Signinleft'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Welcome Back!!")
                            .pauseFor(2100)
                            .deleteAll()
                            .typeString("What's on your mind today?")
                            .start();
                    }}
                />
            </div>
            <div className="right">
                <div className='auth-form-container'>
                    <form className="login_form" onSubmit={handleSubmit}>
                        <h1 className='form-head'>Sign In</h1>

                        <div className="input-wrapper">
                            <input
                                type="email"
                                placeholder="Email"
                                value={values.email}
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                        </div>

                        <div className="input-wrapper">
                            <input
                                type={PasswordInputType}
                                placeholder="Password"
                                value={values.password}
                                name="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='toggle-icon'>{ToggleIcon}</span>
                            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                        </div>

                        {serverError && <p className='server-error'>{serverError}</p>}
                        <button className='sub' type="submit">Login</button>
                        <Link to='/register' className="lnk_btn">New here? Create an account</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
