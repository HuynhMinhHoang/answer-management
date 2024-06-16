import React, { useState } from "react";
import "./Register.scss";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { registerUser } from "../../services/APIService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye1 from "../../assets/eye1.png";
import eye2 from "../../assets/eye2.png";
import { ImSpinner2 } from "react-icons/im";
import Languages from "../Header/Languages";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    if (!username) {
      toast.error("Username is empty!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email is not valid!");
      return;
    }
    if (!password) {
      toast.error("Password is empty!");
      return;
    }
    if (password !== reEnterPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);
      let res = await registerUser(email, username, password);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setIsLoading(false);
        navigate("/login");
        console.log(res.EM);
      } else {
        toast.error(res.EM);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="login-header">
          <p>Already have an account?</p>
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Log in
          </button>
          <Languages />
        </div>

        <div className="login-content">
          <div className="login-form">
            <div className="login-form-header">
              <svg
                width="43"
                height="22"
                fill="none"
                onClick={() => {
                  goToHome();
                }}
              >
                <path
                  fill="currentColor"
                  // fill-rule="evenodd"
                  d="M0 5.34C0 1.82 1.39 0 3.72 0c2.34 0 3.73 1.82 3.73 5.34V16c0 3.52-1.4 5.34-3.73 5.34S0 19.52 0 16V5.34ZM25.08 0h-7.7c-6.9 0-7.44 2.98-7.44 6.96l-.01 7.42c0 4.14.52 6.96 7.48 6.96h7.67c6.92 0 7.43-2.97 7.43-6.94V6.97c0-3.99-.53-6.97-7.43-6.97Z"
                  // clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                width="108"
                height="24"
                fill="none"
                onClick={() => {
                  goToHome();
                }}
              >
                <path
                  fill="currentColor"
                  d="M69.87 16.61c-2.22 0-3.37-1.83-3.37-4.08s1.13-3.99 3.37-3.99c2.29 0 3.37 1.82 3.37 3.99-.02 2.29-1.16 4.08-3.37 4.08ZM48.1 8.54c1.3 0 1.84.76 1.84 1.42 0 1.6-1.62 2.29-5.01 2.39 0-1.97 1.12-3.8 3.17-3.8Zm-14.44 8.07c-2.1 0-2.99-1.71-2.99-4.08 0-2.35.9-3.99 3-3.99 2.12 0 3.12 1.7 3.12 3.99 0 2.39-1.04 4.08-3.13 4.08Zm-17.8-10.4h-3.3l5.46 12.51c-1.04 2.31-1.6 2.89-2.32 2.89-.77 0-1.49-.62-2-1.16l-1.45 1.92a5.14 5.14 0 0 0 3.7 1.63c1.73 0 3.05-1 3.82-2.79l6.3-15.02h-3.24l-3.28 8.97-3.7-8.95Zm87.1 2.33c1.6 0 1.92 1.1 1.92 3.67v6.75h2.85v-8.52c0-3.07-2.1-4.4-4.05-4.4-1.73 0-3.31 1.07-4.2 3.06a4.01 4.01 0 0 0-3.96-3.07c-1.63 0-3.25 1.04-4.13 2.97V6.21h-2.85v12.73h2.85V13.5c0-2.74 1.44-4.96 3.4-4.96 1.6 0 1.9 1.1 1.9 3.67v6.75h2.86l-.02-5.46c0-2.74 1.46-4.96 3.42-4.96ZM80.14 6.21h-1.36v12.73h2.85v-4.88c0-3.09 1.36-5.18 3.39-5.18.52 0 .96.02 1.44.22l.44-3c-.36-.05-.68-.09-1-.09-2 0-3.45 1.38-4.29 3.15V6.21h-1.47Zm-10.28-.2c-3.77 0-6.31 2.87-6.31 6.5 0 3.76 2.58 6.57 6.31 6.57 3.8 0 6.38-2.89 6.38-6.57C76.23 8.86 73.6 6 69.87 6Zm-21.61 10.6a2.98 2.98 0 0 1-3.05-2.29c3.77-.16 7.46-1.08 7.46-4.4 0-1.91-1.89-3.89-4.6-3.89-3.64 0-6.1 2.97-6.1 6.5 0 3.68 2.42 6.57 6.05 6.57a6.62 6.62 0 0 0 5.39-2.49l-1.38-1.87c-1.47 1.5-2.37 1.87-3.77 1.87ZM34.22 6.01c-1.44 0-2.89.84-3.45 2.16V6.2h-2.84v17.73h2.84v-6.33c.6.91 1.99 1.51 3.21 1.51 3.8 0 5.8-2.8 5.8-6.6-.02-3.74-1.99-6.5-5.56-6.5Zm-19.97-4.9H.82v2.77h5.25v15.06h2.99V3.88h5.2V1.12Zm42.33 5.1h-1.7v2.55h1.7v10.18h2.85V8.76h2.76V6.21h-2.76V4.22c0-1.27.52-1.71 1.7-1.71.44 0 .84.12 1.38.3l.65-2.4A5.44 5.44 0 0 0 60.9 0c-2.73 0-4.33 1.63-4.33 4.46v1.75Z"
                ></path>
              </svg>

              <p>
                Get better data with conversational forms, surveys, quizzes &
                more.
              </p>
            </div>
            <div className="login-form-body">
              <div>
                <div className="login-form-input">
                  {/* <label>Email</label> */}
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="login-form-input">
                  {/* <label>Email</label> */}
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="login-form-input">
                  {/* <label>Password</label> */}
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {hidePassword ? (
                    <img
                      src={eye1}
                      className="eye"
                      alt="Hide Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  ) : (
                    <img
                      src={eye2}
                      className="eye"
                      alt="Show Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  )}
                </div>

                <div className="login-form-input">
                  {/* <label>Password</label> */}
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => {
                      setReEnterPassword(e.target.value);
                    }}
                  />
                  {hidePassword ? (
                    <img
                      src={eye1}
                      className="eye"
                      alt="Hide Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  ) : (
                    <img
                      src={eye2}
                      className="eye"
                      alt="Show Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  )}
                </div>
                <p>Forgot password?</p>
                <div className="btn-login">
                  <button
                    onClick={() => {
                      handleRegister();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading === true && (
                      <ImSpinner2 className="loaderIcon" />
                    )}
                    Create my free account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Register;
