import React, { useState } from 'react';
import joota from '../Images/joota.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OTPVerification() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send the entered OTP to the server for verification
            const response = await axios.post('/api/user/otp', {
                email_otp: otp,
            });
            if (response.data === 'authenticated') {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row border rounded-5 p-3 bg-white shadow">
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                </div>
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>OTP Verification</h2>
                            <p>Enter the OTP sent to your email</p>
                        </div>
                        <form onSubmit={handleOtpSubmit} id="otpForm">
                            <div className="col-md-12 mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Enter OTP"
                                    name="email_otp"
                                    value={otp}
                                    onChange={handleOtpChange}
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <button
                                    className="btn btn-lg btn-primary w-100 fs-6"
                                    type="submit"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTPVerification;
