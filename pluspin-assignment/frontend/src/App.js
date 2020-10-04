import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      {!localStorage.getItem('token') && <Login />}
      {localStorage.getItem('token') && <Redirect to="/home" />}
      <Route path="/home">
        <Home />
      </Route>
    </BrowserRouter>
  );
}

export default App;
