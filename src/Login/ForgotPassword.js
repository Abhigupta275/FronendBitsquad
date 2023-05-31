import React,{useContext, useEffect, useState,useRef} from 'react'
import './forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

function ForgotPassword() {

    const { setAuth } = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        const response = await axios.post('http://127.0.0.1:8000/SentMailView/');
        setAuth(email);
        // setEmail("")
        setSuccess(true)
        console.log(response);
      }catch(err){
        if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Invalid Data');
      }
      errRef.current.focus();
      }
    }

    useEffect(() =>{
      setErrMsg('');
    },[email])

  return (
    <div>
    {success ?  (
      <section className="section">
          {navigate('/newpassword')}
      </section>
    )  : (
      <section>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
  <div className="account-pages">
    <div className="container justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/*<div className="text-center mb-5">
                 <p className="font-size-15 text-muted mt-3"> <b>Bitsquad Software</b> Forgot Password</p> 
  </div> */}
          <div className="card overflow-hidden">
            <div className="row g-0">
              <div className="col-lg-12">
                <div className="p-lg-5 p-4">
                  <div>
                    <h5>Reset Password</h5>
                    <p className="text-muted">Reset your Password</p>
                  </div>
                  <div className="mt-4 pt-3">
                    <div className="alert alert-success mb-4" role="alert">
                      Enter your Email and instructions will be sent to you!
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="fw-semibold" htmlFor="useremail">Email</label>
                        <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                      </div>
                      <div className="mt-4 text-end">
                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Reset</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          {/* end card */}
          <div className="mt-5 text-center">
            <p>Remember It ? <a href="auth-login.html" className="fw-semibold text-decoration-underline"> Login</a> </p>
            <p><b>Bitsquad Software</b>.</p>
          </div>
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
    {/* end container */}
  </div>
  </section>
    )}
</div>
  )
}

export default ForgotPassword
