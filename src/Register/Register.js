import React from "react";
import "./register.css";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = 'http://127.0.0.1:8000/register/';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const handleContact = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setMob(newValue);
  };

  const navigate = useNavigate()
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validMob, setValidMob] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(firstName);
  }, [firstName]);

  useEffect(() => {
    setValidLastName(lastName);
  }, [lastName]);

  useEffect(() => {
    setValidMob(mob);
  }, [mob]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(password_REGEX.test(password));
    // setValidMatch(password === matchpassword);
  }, [password]); //, matchpassword

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, mob, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: firstName,
      lastname: lastName,
      mob,
      email,
      password,
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      //console.log(response?.accessToken);
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div>
    {success ? (
        <section className="section">
            {navigate('/')}
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
      <div className="account-pages">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card card1">
                <div className="row g-0">
                  <div className="col-lg-12">
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5>Register account</h5>
                        <p className="text-muted">
                          Sign Up your account now.
                        </p>
                      </div>

                      <div className="mt-4 pt-3">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="fw-semibold" htmlFor="firstname">
                              First Name:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validFirstName ? "valid" : "hide"}
                              />
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              ref={userRef}
                              autoComplete="off"
                              onChange={(e) => setFirstName(e.target.value)}
                              value={firstName}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="lastname">
                              Last Name:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validLastName ? "valid" : "hide"}
                              />
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="lastname"
                              autoComplete="off"
                              onChange={(e) => setLastName(e.target.value)}
                              value={lastName}
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="mob">
                              Mobile Number:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validMob ? "valid" : "hide"}
                              />
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="mob"
                              autoComplete="off"
                              onChange={handleContact}
                              value={mob}
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="email">
                              Email:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validEmail ? "valid" : "hide"}
                              />
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="email"
                              autoComplete="off"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="password">
                              Password:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validPassword ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validPassword || !password
                                    ? "hide"
                                    : "invalid"
                                }
                              />
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              required
                              aria-invalid={validPassword ? "false" : "true"}
                              aria-describedby="passwordnote"
                              onFocus={() => setPasswordFocus(true)}
                              onBlur={() => setPasswordFocus(false)}
                            />
                            <p
                              id="passwordnote"
                              className={
                                passwordFocus && !validPassword
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              8 to 24 characters.
                              <br />
                              Must include uppercase and lowercase letters, a
                              number and a special character. Allowed special
                              characters:{" "}
                              <span aria-label="exclamation mark">!</span>{" "}
                              <span aria-label="at symbol">@</span>{" "}
                              <span aria-label="hashtag">#</span>{" "}
                              <span aria-label="dollar sign">$</span>{" "}
                              <span aria-label="percent">%</span>
                            </p>
                          </div>

                          <div className="mt-4 ">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                              disabled={
                                !validFirstName ||
                                !validLastName ||
                                !validMob ||
                                !validEmail ||
                                !validPassword
                                  ? true
                                  : false
                              }
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <a
                    href="/"
                    className="fw-semibold text-decoration-underline"
                  >
                    
                    Login
                  </a>
                </p>
                <p>
                  © <script>document.write(new Date().getFullYear())</script>
                  2023 <b>Bitsquad Software</b>
                  <i className="mdi mdi-heart text-danger"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>
      )}
      </div>
      
      );
};
export default Register;


