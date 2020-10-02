import React from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./Movie.css";

const Movies = ({ moviesData }) => {
  console.log(moviesData);
  return (
    <div className="movies">
      {moviesData.length > 0 &&
        moviesData.map((data, id) => <MovieCard movie={data} id={id} />)}
      {moviesData.length == 0 && <h2>Add movies</h2>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    moviesData: state.movies
  };
};

export default connect(mapStateToProps)(Movies);
