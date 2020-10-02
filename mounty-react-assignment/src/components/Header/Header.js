import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <p className="link">Movie Database</p>
      </Link>
      <Link to="/add-movie">
        <button className="btn">ADD MOVIE</button>
      </Link>
    </div>
  );
};

export default Header;
