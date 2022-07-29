import GameArea from './Components/GameArea';

import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './Components/NavBar';

export default function App() {

  const mapOne = require("./MapOne.JSON")
  const mapTwo = require("./MapTwo.JSON")
  const mapThree = require("./MapThree.JSON")

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/mapthree"> <GameArea key="1" map={mapThree} title="Map 3" /> </Route>
          <Route path="/maptwo"> <GameArea key="2" map={mapTwo} title="Map 2" /> </Route>
          <Route path="/"> <GameArea key="3" map={mapOne} title="Map 1" /> </Route>
        </Switch>
      </div>
    </Router>
  );
}