import React, {useContext} from 'react'
import {NavLink} from "react-router-dom"
import { AuthContext } from "./AuthContext.jsx";
import "./Styles/GlobalHeader.css"

function HandleClick()
{
    let MenuButton = document.getElementById("DrawerButton");
    let BlankArea = document.getElementById("NavCloseArea");
    let NavBar = document.getElementById("GlobalNav");
        if(NavBar.className === "WebNav")
        {
            BlankArea.className = "AreaVisible"
            NavBar.className += " MobileMenu";
            MenuButton.className += " MenuButtonClicked";
        }
        else
        {
            BlankArea.className = "AreaHidden"
            NavBar.className = "WebNav";
            MenuButton.className = "MenuButton";
        }
}

function HandleLogRegClick(ID)
{
    let LogRegPane = document.getElementById(ID);
        if(LogRegPane.className === "LoginRegPaneNotVisible")
        {
            LogRegPane.className = "LoginRegPaneVisible";
        }
        else
        {
            LogRegPane.className = "LoginRegPaneNotVisible";
        }
}

function LoginRegPane(props)
{
    const {rootState, logoutUser} = useContext(AuthContext);
    const {isAuth,theUser} = rootState;
    let id = props.CompId;

    if(isAuth)
    {
        return (
            <div id={id} className="LoginRegPaneNotVisible">
                <div className="PaneHeading">Howdy, {theUser.fname}</div>
                <hr/>
                <NavLink to="/MyAccount" className="PaneItem" onClick={(e)=>{e.stopPropagation(); HandleLogRegClick(id)}}>Manage Account</NavLink>
                <button onClick={logoutUser} className="LogoutButton">Logout</button>
            </div>
        );
    }
    else
    {
        return (
            <div id={id} className="LoginRegPaneNotVisible">
                <div className="PaneHeading">Howdy, Visitor</div>
                <hr/>
                <NavLink to="/Login" className="PaneItem" onClick={(e)=>{ e.stopPropagation(); HandleLogRegClick(id)}}>Login</NavLink>
                <NavLink to="/Register" className="PaneItem" onClick={(e)=>{ e.stopPropagation(); HandleLogRegClick(id)}}>Register</NavLink>
            </div>
        );
    }
}

function GlobalHeader()
{
    return (
    <div id="GlobalHeader">
        <div id="MobileDrawer">
            <button id="DrawerButton" className="MenuButton" onClick={HandleClick}></button>
        </div>
        <div id="WebTitle" onClick={function() {
                window.location.href = window.location.href.replace(window.location.href.substr(
                    window.location.href.lastIndexOf('/')+1),'Home');
        }}>
            <div id="HeaderIcon"></div>
            <div id="HeaderTitle">OMCMS</div>
        </div>
        <div id="NavCloseArea" className="AreaHidden" onClick={HandleClick}></div>
        <div id="GlobalNav" className="WebNav">
            <NavLink to="/Home" className="NavItem" onClick={HandleClick}>Home</NavLink>
            <NavLink to="/Dashboard" className="NavItem" onClick={HandleClick}>Dashboard</NavLink>
            <NavLink to="/Tools" className="NavItem" onClick={HandleClick}>Tools</NavLink>
            <NavLink to="/About" className="NavItem" onClick={HandleClick}>About</NavLink>
            <div id="DesktopUser"
                onMouseEnter= { function(){document.getElementById("LoginRegPaneDesktop").className = "LoginRegPaneVisible";} }
                onMouseLeave= { function(){document.getElementById("LoginRegPaneDesktop").className = "LoginRegPaneNotVisible";} }>
                <div className="UserIcon"></div>
                <LoginRegPane CompId="LoginRegPaneDesktop"/>
            </div>
        </div>
        <div id="MobileUser" 
                onClick={ function(){document.getElementById("LoginRegPaneMobile").className = "LoginRegPaneVisible";} }
                onMouseLeave= { function(){document.getElementById("LoginRegPaneMobile").className = "LoginRegPaneNotVisible";} }>
            <div className="UserIcon"></div>
            <LoginRegPane CompId="LoginRegPaneMobile"/>
        </div>
    </div>);
}

export default GlobalHeader;