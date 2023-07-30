import React, {useState} from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.username === '' && err.email === '' && err.password === '') {
            axios
                .post('http://localhost:8081/signup', values)
                .then((res) => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    };
    
    return (
        <div className='login-container'>
            <div className='login-form'>
                <form action='' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <strong><label>Username</label></strong>
                        <input type='username' placeholder='Enter Username' name='username' onChange={handleInput}/>
                        {errors.username && <span className='error-message'>{errors.username}</span>}
                    </div>
                    <div className='form-group'>
                        <strong><label type='email'>Email</label></strong>
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleInput}/>
                        {errors.email && <span className='error-message'>{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        <strong><label type='password'>Password</label></strong>
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleInput}/>
                        {errors.password && <span className='error-message'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn-green'>Sign Up</button>
                    <p className='gray'>Already have account?</p>
                    <Link to='/' className='btn-white center'>Log In</Link>
                </form>
            </div>
            <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
            </div>
        </div>
    )
}

export default Signup;