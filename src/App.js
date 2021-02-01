import React, { Component } from "react";
import { Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';
import GlobalHeader from "./components/GlobalHeader.jsx"
import Home from "./components/home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Tools from "./components/Tools.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";


function MainContainer()
{
  return <div>
    <Route path="/Home" component={Home}/>
    <Route path="/Dashboard" component={Dashboard}/>
    <Route path="/Tools" component={Tools}/>
    <Route path="/About" component={About}/>
    <Route path="/Login" component={Login}/>
  </div>;
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <GlobalHeader/>
        <MainContainer/>
      </div>
    </HashRouter>
  );
}

export default App;
