import React, {useState} from 'react';
import './Register.css';
import { Link,} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate();
    const [err, setErrors] = useState(null);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))};
    
        const handleClick = async (e) => {
            e.preventDefault();
            try {
                await axios.post("http://localhost:8800/api/auth/register", inputs);
                navigate("/login")
            } catch (err) {
                setErrors(err);
                if (err.response) {
                    console.log(err.response.data);
                }
            }
        };
 
    return (
        <div className='login-container'>
            <div className='login-form'>
                <form action=''>
                    <div className='form-group'>
                        <strong><label>Username</label></strong>
                        <input type='username' placeholder='Enter Username' name='username' onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <strong><label type='email'>Email</label></strong>
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <strong><label type='password'>Password</label></strong>
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleChange}/>
                    </div>
                    {err && <span>{err.response.data}</span>}
                    <button className='btn-green' onClick={handleClick}>Sign Up</button>
                    <p className='gray'>Already have account?</p>
                    <Link to='/login' className='btn-white center'>Log In</Link>
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

export default Register;