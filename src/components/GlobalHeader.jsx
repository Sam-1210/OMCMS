import React, {useContext} from 'react'
import {NavLink} from "react-router-dom"
import { AuthContext } from "./AuthContext.jsx";
import "./Styles/GlobalHeader.css"

function HandleClick()
{
    let MenuButton = document.getElementById("MobileNavButton");
    let NavBar = document.getElementById("GlobalNav");
        if(NavBar.className === "WebNav")
        {
            NavBar.className += " MobileMenu";
            MenuButton.className += " MenuButtonClicked";
        }
        else
        {
            NavBar.className = "WebNav";
            MenuButton.className = "MenuButton";
        }
}

function HandleLogRegClick()
{
    let LogRegPane = document.getElementById("LoginRegPane");
        if(LogRegPane.className === "LoginRegPaneVisible")
        {
            LogRegPane.className = "LoginRegPaneNotVisible";
        }
        else
        {
            LogRegPane.className = "LoginRegPaneVisible";
        }
}

function LoginRegMobile()
{
    const {rootState, logoutUser} = useContext(AuthContext);
    const {isAuth,theUser} = rootState;

    if(isAuth)
    {
        return(
        <div id="LoginRegMobile">
            <hr/>
            <div className="NavItem PaneItem">Howdy, {theUser.fname}</div>
            <NavLink to="/MyAccount" className="NavItem PaneItem" onClick={HandleClick}>Manage Account</NavLink>
            <button onClick={function(){logoutUser();  HandleClick();}} className="LogoutButton" >Logout</button>
        </div>
        );
    }
    else
    {
        return(
        <div id="LoginRegMobile">
            <NavLink to="/Login" className="NavItem PaneItem" onClick={HandleClick}>Login</NavLink>
            <span> | </span>
            <NavLink to="/Register" className="NavItem PaneItem" onClick={HandleClick}>Register</NavLink>
        </div>
        );
    }
}

function LoginRegPane()
{
    const {rootState, logoutUser} = useContext(AuthContext);
    const {isAuth,theUser} = rootState;

    if(isAuth)
    {
        return (
            <div id="LoginRegPane" className="LoginRegPaneNotVisible">
                <div className="PaneHeading">Howdy, {theUser.fname}</div>
                <hr/>
                <NavLink to="/MyAccount" className="PaneItem" onClick={HandleLogRegClick}>Manage Account</NavLink>
                <button onClick={logoutUser} className="LogoutButton">Logout</button>
            </div>
        );
    }
    else
    {
        return (
            <div id="LoginRegPane" className="LoginRegPaneNotVisible">
                <div className="PaneHeading">Howdy, Visitor</div>
                <hr/>
                <NavLink to="/Login" className="PaneItem" onClick={HandleLogRegClick}>Login</NavLink>
                <NavLink to="/Register" className="PaneItem" onClick={HandleLogRegClick}>Register</NavLink>
            </div>
        );
    }
}

function GlobalHeader()
{
    return (
    <div className="GlobalHeader">
        <div id="WebTitle">
            <div id="HeaderIcon"></div>
            <div id="HeaderTitle">
                Online Meetings and Classes<br/>Management System
            </div>
        </div>
        <div id="MobileNav">
            <button id="MobileNavButton" className="MenuButton" onClick={HandleClick}>
            </button>
        </div>
        <div id="GlobalNav" className="WebNav">
            <NavLink to="/Home" className="NavItem" onClick={HandleClick}>Home</NavLink>
            <NavLink to="/Dashboard" className="NavItem" onClick={HandleClick}>Dashboard</NavLink>
            <NavLink to="/Tools" className="NavItem" onClick={HandleClick}>Tools</NavLink>
            <NavLink to="/About" className="NavItem" onClick={HandleClick}>About</NavLink>
            <div className="UserIconBG"
                onMouseEnter= { function(){document.getElementById("LoginRegPane").className = "LoginRegPaneVisible";} }
                onMouseLeave= { function(){document.getElementById("LoginRegPane").className = "LoginRegPaneNotVisible";} }>
                <div id="UserIcon"></div>
                <LoginRegPane/>
            </div>
            <LoginRegMobile/>
        </div>
    </div>);
}

export default GlobalHeader;