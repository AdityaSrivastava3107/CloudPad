import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate() 

    const userLogin = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/api/auth/login', { email, password })
            .then((response) => {
                // Handle the response from the backend API
                localStorage.setItem('auth-token', response.data.authtoken);
                navigate('/');
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    }
    return (
        <div className="container my-5" style={{ width: '300px' }}>
            <form onSubmit={userLogin}>
            <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">Your Mail ID is secured, just like your Notes.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={userLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
