import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, id }) => {
  const { title, image, description } = movie;
  const [descView, setdescView] = useState(description.length > 500);

  function setView() {
    setdescView(!descView);
  }

  return (
    <div className="card" key={id.toString()}>
      {(descView || description.length < 500) && (
        <div className="image">
          <img src={image} alt="movie" />
        </div>
      )}
      <div
        className={
          description.length < 500
            ? "movie-data"
            : descView
              ? "movie-data"
              : "movie-data w-100"
        }
      >
        <h3>{title}</h3>
        <p>
          {descView && movie.description.substring(0, 500)}
          {!descView && description}
          {description.length > 500 && (
            <span>
              <button type="button" onClick={() => setView()}>
                {descView ? "See More >>" : "See Less <<"}
              </button>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
