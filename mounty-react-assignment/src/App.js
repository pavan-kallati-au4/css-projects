import React from "react";
import "./styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Movies from "./components/Movies/Movies";
import AddMovie from "./components/AddMovie/AddMovie";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/">
        <Movies />
      </Route>
      <Route path="/add-movie">
        <AddMovie />
      </Route>
    </BrowserRouter>
  );
}
