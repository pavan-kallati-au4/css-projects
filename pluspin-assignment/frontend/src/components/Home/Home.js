import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Profile from '../Profile/Profile';
import HealthVital from '../HealthVital/HealthVital';
import NewHealthVitals from '../NewHealthVitals/NewHealthVitals';

const Home = ({ dispatch, userData }) => {
  console.log(userData);
  const { name, weight } = userData;
  console.log(name);
  useEffect(() => {
    const data = axios.get('http://localhost:4000/api/user', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    data.then(res => {
      dispatch({
        type: "SET_USER_DATA",
        payload: res.data.data
      })
    });
  }, []);

  return (
    <div>
      {!name && <Profile />}
      {name && !weight && <HealthVital />}
      {name && weight && <NewHealthVitals />}
    </div>
  )
};

const mapStateToProps = ({ userData }) => {
  return {
    userData
  }
}

export default connect(mapStateToProps)(Home);