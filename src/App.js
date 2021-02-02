import { Route, Redirect, HashRouter} from "react-router-dom";
import './App.css';
import GlobalHeader from "./components/GlobalHeader.jsx"
import Home from "./components/home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Tools from "./components/Tools.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function MainContainer()
{
  return <div id="PagesContainer">
    <Route path="/Home" component={Home}/>
    <Route path="/"><Redirect to="/Home" /></Route>
    <Route path="/Dashboard" component={Dashboard}/>
    <Route path="/Tools" component={Tools}/>
    <Route path="/About" component={About}/>
    <Route path="/Login" component={Login}/>
    <Route path="/Register" component={Register}/>
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
