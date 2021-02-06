import React, {useContext} from 'react'
import { Route, Redirect, HashRouter} from "react-router-dom";
import AuthContextProvider, { AuthContext} from "./components/AuthContext.jsx";
import GlobalHeader from "./components/GlobalHeader.jsx"
import Home from "./components/home.jsx";
import DashboardSelector from "./components/DashboardSelector.jsx";
import Tools from "./components/Tools.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MyAccount from "./components/MyAccount.jsx";
import './App.css';

function MainContainer()
{
  const {rootState} = useContext(AuthContext);
  const {isAuth} = rootState;

  if(isAuth)
  {
    return <div id="PagesContainer">
    <Route path="/Home" component={Home}/>
    <Route path="/"><Redirect to="/Home" /></Route>
    <Route path="/Dashboard" component={DashboardSelector}/>
    <Route path="/Tools" component={Tools}/>
    <Route path="/About" component={About}/>
    <Route path="/MyAccount" component={MyAccount}/>
    <Route path="/Login"><Redirect to="/MyAccount" /></Route>
    <Route path="/Register"><Redirect to="/MyAccount" /></Route>
    </div>;
  }
  else
  {
    return <div id="PagesContainer">
      <Route path="/Home" component={Home}/>
      <Route path="/"><Redirect to="/Home" /></Route>
      <Route path="/Dashboard"><Redirect to="/Login" /></Route>
      <Route path="/Tools"><Redirect to="/Login" /></Route>
      <Route path="/About" component={About}/>
      <Route path="/Login" component={Login}/>
      <Route path="/Register" component={Register}/>
      <Route path="/MyAccount"><Redirect to="/Login" /></Route>
    </div>;
  }
}

function App() {
  return (
    <AuthContextProvider>
      <HashRouter>
        <div className="App">
          <GlobalHeader/>
          <MainContainer/>
        </div>
      </HashRouter>
    </AuthContextProvider>
  );
}

export default App;
