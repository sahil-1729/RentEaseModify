import { useState } from "react";
import loginImage from "../Images/loginImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

// function GoogleAuth() {
//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => console.log(tokenResponse),
//   });
//   return (
//     <div
//       style={{
//         textAlign: "center",
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <div>OR</div>
//       {/* <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           console.log(credentialResponse);
//         }}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       /> */}
//       <button
//         onClick={() => login()}
//         className="btn btn-lg btn-danger w-100 fs-6"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <img src={loginImage} alt="404" width="80%" height="80%" />
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Login</h2>
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
                    <small>
                      <a href="#">Forgot Password?</a>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-danger w-100 fs-6"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="row">
                <small>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </small>
              </div>
            </div>
            {/* <GoogleAuth /> */}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
