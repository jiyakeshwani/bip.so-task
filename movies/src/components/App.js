import React from "react";
import Header from "./Header";
import Movies from "./Movies";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import SingleMovie from "./SingleMovie";
import Home from "./Home";
import { useState } from "react";
import { func } from "prop-types";

function App() {
 


  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <Home/>
       
        }
      ></Route>
      <Route path="/movies/:id" element={<SingleMovie />}></Route>
    </Routes>
  );
}

export default App;
