import React, { useState } from "react";
import signupImage from "../Images/signupImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
// import { WindowScrollController } from "@fullcalendar/core/internal";

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make sure to send the complete formData object to the server
      const response = await axios.post("/api/user/signup", formData);
      console.log(response.data);
      if (response.data === "User already exists.") {
        // Redirect to the login page after successful registration
        setTimeout(window.alert(response.data));
        navigate("/");
      } else {
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img src={signupImage} alt="404" width="80%" height="80%" />
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Register</h2>
              <p>Create your account</p>
            </div>
            <form onSubmit={handleSubmit} id="registrationForm">
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="tel"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <button
                  className="btn btn-lg btn-danger w-100 fs-6"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="row">
              <div className="col-md-12">
                <small className="underline decoration-black">
                  Already have an account?{" "}
                  <a className="" href="/login">
                    Login
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
