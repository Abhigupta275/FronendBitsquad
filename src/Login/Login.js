import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import "./login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
   

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post('http://127.0.0.1:8000/login/',
                JSON.stringify({email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            const token = response.data.access;
           
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            const access = response?.data?.access;
            setAuth({ email, password, access });
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

  return (
    <div>
    {success ?  (
      <section className="section">
          {navigate('/sidebar')}
      </section>
    )  : (
      <section>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    <div className="account-pages"> 
        <div className="row justify-content-center">
          <div className="col-md-12">           
            <div className="card card2">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="p-lg-5 p-4">
                    <div>
                      <h5>Welcome Back !</h5>
                      <p className="text-muted">Sign in to continue with Bitsquad.</p>
                    </div>
                    <div className="mt-4 pt-3">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username" className="fw-semibold">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            id="email"
                            placeholder="Enter Email"
                          />
                        </div>

                        <div className="mb-3 mb-4">
                          <label htmlFor="userpassword" className="fw-semibold">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            autoComplete="off"
                            id="password"
                            placeholder="Enter password"
                          />
                        </div>

                        <div className="row align-items-center">
                          <div className="col-6">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input font-size-16"
                                id="remember-check"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember-check"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-end">
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <a
                            href="https://www.preview.pichforest.com/samply/layouts/auth-recoverpw.html"
                            className="text-muted"
                          >
                            <i className="mdi mdi-lock me-1"></i> Forgot your
                            password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p>
                Don't have an account ?
                <a
                  href="/register"
                  className="fw-semibold text-decoration-underline text-primary"
                >
                
                  Sign up
                </a>
              </p>
              <p>
                © <script>document.write(new Date().getFullYear())</script>2023{" "}
                <b>Bitsquad Software</b>
               
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
  )}
      </div>
  );
}

export default Login;
