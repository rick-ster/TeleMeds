import React, { useState } from 'react';
import Typewriter from "typewriter-effect";
import '../CSS/GetStarted.css';
import usePasswordToggle from '../components/visPassToggle';
import usePasswordTogglee from '../components/visPassTogglee';
import { Link } from 'react-router-dom';
import '../CSS/Form.css';
import { useFormik } from 'formik';
import { RegisterSchema } from '../schemas/RegisterSchema';
import SuccessModal from '../components/SuccessModal';

const initialValues = {
    username: "",
    password: "",
    confirm_password: "",
    email: "",
};

const SignUp = () => {
    const [serverError, setServerError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    setIsModalOpen(true);
                } else {
                    setServerError(data.message);
                }
            } catch {
                setServerError('An error occurred. Please try again.');
            }
        },
    });

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [PasswordInputType1, ToggleIcon1] = usePasswordTogglee();

    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.href = '/login';
    };

    return (
        <div className='log'>
            <div className="left" id='Signupleft'>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Greetings")
                            .pauseFor(700)
                            .deleteAll()
                            .typeString("New here? No Problem")
                            .pauseFor(700)
                            .deleteAll()
                            .typeString("Let's Get Started with a few details")
                            .start();
                    }}
                />
            </div>
            <div className="right">
                <div className="auth-form-container">
                    <form className="register_form" onSubmit={handleSubmit}>
                        <h2 className='form-head'>Create Account</h2>

                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                        </div>

                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="username"
                                placeholder="Create your Username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username && <p className='error'>{errors.username}</p>}
                        </div>

                        <div className="input-wrapper">
                            <input
                                type={PasswordInputType}
                                name="password"
                                placeholder="Create Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='toggle-icon'>{ToggleIcon}</span>
                            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                        </div>

                        <div className="input-wrapper">
                            <input
                                type={PasswordInputType1}
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='toggle-icon'>{ToggleIcon1}</span>
                            {errors.confirm_password && touched.confirm_password && <p className='error'>{errors.confirm_password}</p>}
                        </div>

                        {serverError && <p className='server-error'>{serverError}</p>}

                        <button className="sub" type="submit">Register</button>

                        <Link to='/login' className="lnk_btn">Already have an account? Log In</Link>
                    </form>
                </div>
            </div>

            <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default SignUp;
