import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/api/auth/createuser', {
            name: name,
            email: email,
            password: password
        })
            .then((response) => {
                // Handle the response from the backend API
                localStorage.setItem('auth-token', response.data.authtoken);
                navigate('/');
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.log(error);
            });
    }

    return (
        <div className="container my-5" style={{ width: '300px' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Your Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">Your Mail ID is secured, just like your Notes.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter a Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit"  className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
