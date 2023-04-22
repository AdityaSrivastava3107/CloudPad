import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const navigate= useNavigate();

    function userLogin(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/api/auth/login')
            .then((response) => {
                localStorage.setItem('authtoken', response.data.authtoken);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="container my-5" style={{ width:'300px'}}>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{ textAlign: 'center'}}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Your Mail ID is secured, just like your Notes.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ textAlign: 'center' }}>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
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
