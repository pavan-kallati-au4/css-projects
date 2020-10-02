import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import './AddMovie.css'
import { useHistory } from "react-router-dom";

const AddMovie = ({ dispatch, newMovie, length }) => {
  const history = useHistory();
  const { title, description } = newMovie
  useEffect(() => {
    axios
      .get(`https://picsum.photos/id/${length}/info`)
      .then((res) => {
        dispatch({
          type: "SET_NEW_MOVIE",
          payload: {
            key: "image",
            val: res.data.download_url
          }
        })
      });
  }, []);

  function handleNewMovie(key, e) {
    dispatch({
      type: "SET_NEW_MOVIE",
      payload: {
        key,
        val: e.target.value
      }
    });
  }

  function submitNewMovie(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_NEW_MOVIE"
    });
    history.push("/");
  }

  function button() {
    console.log(title.trim().length && description.trim().length, "true")
    return title.trim().length && description.trim().length;
  }

  return (
    <div className="form">
      <form>
        <label for="title">Movie Title</label>
        <input type="text" id="title" name="title" placeholder="Enter title.." value={title} onChange={(e) => handleNewMovie("title", e)} />

        <label for="description">Movie Description</label>
        <textarea type="text" id="description" name="description" placeholder="Enter movie description..." rows="8" value={description} onChange={(e) => handleNewMovie("description", e)} />

        <button type="submit" onClick={(e) => submitNewMovie(e)} disabled={!button()} >Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ newMovie, movies }) => {
  return {
    newMovie,
    length: movies.length
  };
};

export default connect(mapStateToProps)(AddMovie);
