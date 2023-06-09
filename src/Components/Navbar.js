import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
    }, [location]);

    //Used redirect components
    let navigate = useNavigate();
    const login = (e) => {
        e.preventDefault()
        navigate("/login")
    }
    const signup = (e) => {
        e.preventDefault()
        navigate("/signup")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2A2F4F' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CloudPad</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-primary mx-2" onClick={signup} type="submit">Sign Up <i className="fa-regular fa-user" ></i></button>
                        <button className="btn btn-outline-primary mx-2" onClick={login} type="submit">Login <i className="fa-solid fa-right-to-bracket"></i></button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
