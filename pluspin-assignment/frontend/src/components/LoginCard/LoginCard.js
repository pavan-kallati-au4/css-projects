import React, { useState } from 'react';
import axios from 'axios';
import './LoginCard.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginCard = ({ dispatch }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [view, setView] = useState(true);
  const [otp, setOtp] = useState(0);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setView(false);
    await axios.post('http://localhost:4000/api/signup', {
      email: email,
    });
  }

  function handleOTP(e) {
    setOtp(e.target.value);
  }

  function validateOtp() {
    return +otp.length === 5
  }

  async function handleOTPSubmit(e) {
    e.preventDefault();
    const data = await axios.post('http://localhost:4000/api/login', {
      email,
      otp
    });
    localStorage.setItem('token', data.data.token)
    dispatch({
      type: "LOGIN",
    })
    history.push('/home');
  }

  return (
    <div className="align">
      {view && <form className="card">
        <label for="email">Enter email:</label>
        <input type="string" id="email" name="email" className="input" value={email} placeholder="Enter email..." onChange={(e) => handleEmail(e)} />
        <button type="submit" className={validateEmail() ? 'valid' : 'not-valid'} disabled={!validateEmail()} onClick={(e) => handleSubmit(e)}>Continue</button>
      </form>}
      {!view && <form className="card">
        <label for="otp">Enter OTP:</label>
        <input type="number" id="otp" name="otp" className="input" value={otp} placeholder="Enter otp..." onChange={(e) => handleOTP(e)} />
        <button type="submit" className={validateOtp() ? 'valid' : 'not-valid'} disabled={!validateOtp()} onClick={(e) => handleOTPSubmit(e)}>Submit</button>
      </form>}
    </div>
  )
}

const mapStateToProps = ({ loggedIn }) => {
  return {
    loggedIn
  }
}

export default connect(mapStateToProps)(LoginCard);