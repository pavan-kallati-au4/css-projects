import React from 'react';
import { connect } from 'react-redux';
import LoginCard from '../LoginCard/LoginCard';
import './Login.css'
import image from './unnamed.jpg'

const Login = ({ loggedIn }) => {
  return (
    <>
      {!loggedIn && <div className="login">
        <div className="login-image">
          <img src={image} alt="doctor"></img>
        </div>
        <div className="login-card">
          <LoginCard />
        </div>
      </div>}
    </>
  )
}


const mapStateToProps = ({ loggedIn }) => {
  return {
    loggedIn
  }
}

export default connect(mapStateToProps)(Login);