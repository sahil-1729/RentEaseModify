import  { useState } from 'react';
import joota from '../Images/joota.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = async (event)=> {
        event.preventDefault()
        try{
            const response=await axios.post('/api/user/login',{
                email,password
            })
            console.log(response)
            if(response.status===200){
                navigate('/');
            }
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row border rounded-5 p-3 bg-white shadow">
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{
                    backgroundImage: "url('joota.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    color: "white",
                    fontSize: "250%",
                }}>
                </div>
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>Hello, Again</h2>
                            <p>We are happy to have you back.</p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Email address"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="input-group mb-1">
                                <input
                                    type="password"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="input-group mb-5 d-flex justify-content-between">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="formCheck"
                                    />
                                    <label
                                        htmlFor="formCheck"
                                        className="form-check-label text-secondary"
                                    >
                                        <small>Remember Me</small>
                                    </label>
                                </div>
                                <div className="forgot">
                                    <small><a href="#">Forgot Password?</a></small>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-primary w-100 fs-6" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="row">
                            <small>Don't have an account? <a href="/signup">Sign Up</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
