import { createStore } from "redux";

const INITIAL_STATE = {
  movies: [
    {
      title: "Prestige",
      description:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      image:
        "https://vignette.wikia.nocookie.net/warner-bros-entertainment/images/8/8c/The_Prestige.jpg/revision/latest?cb=20161024022057"
    },
  ],
  newMovie: {
    title: "",
    description: "",
    image: ""
  }
};

function appReducer(state = INITIAL_STATE, { type, payload }) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "ADD_MOVIE":
      stateCopy.movies.push(payload);
      return stateCopy;
    case "SET_NEW_MOVIE":
      const { key, val } = payload;
      stateCopy.newMovie[key] = val;
      return stateCopy;
    case "ADD_NEW_MOVIE":
      stateCopy.movies.push(stateCopy.newMovie);
      stateCopy.newMovie = {
        title: "",
        description: "",
        image: ""
      }
      return stateCopy;
    default:
      return stateCopy;
  }
}

const store = createStore(appReducer);

export default store;
