import React from "react";
import Div100vh from "react-div-100vh"
import "./App.css";
import Navbar from "./components/Navbar";
import Game from "./components/Game";

function App() {
  return (
    <Div100vh className="App">
      <Navbar />
      <Game />
    </Div100vh>
  );
}

export default App;
