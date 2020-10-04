import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const INITIAL_STATE = {
  userData: {},
  loggedIn: localStorage.getItem('token'),
  profileData: {
    name: "",
    gender: "male",
    date: "",
    address: "",
    phonenumber: "",
  },
  health: {
    height: null,
    weight: null,
    bp: ['0/0'],
    sugar: []
  }
};

function appReducer(state = INITIAL_STATE, { type, payload }) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "SET_USER_DATA":
      stateCopy.userData = payload
      return stateCopy;
    case "SET_PROFILE_DATA":
      const { key, value } = payload;
      stateCopy.profileData[key] = value;
      return stateCopy;
    case "SET_HEALTH_DATA":
      const { key1, value1 } = payload;
      stateCopy.health[key1] = value1;
      return stateCopy;
    case "LOGIN":
      stateCopy.loggedIn = true;
      return stateCopy
    default:
      return stateCopy;
  }
}

const store = createStore(appReducer, composeWithDevTools());

export default store;