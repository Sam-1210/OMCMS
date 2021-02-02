import {NavLink} from "react-router-dom"
import "./GlobalHeader.css"

function LoginRegMobile()
{
    return(
        <div id="LoginRegMobile">
            {/* check if user exist, show my account else take to login/reg mobile*/}
            <NavLink to="/Login" className="NavItem PaneItem">Login</NavLink>
            <span>|</span>
            <NavLink to="/Register" className="NavItem PaneItem">Register</NavLink>
        </div>
    );
}

function LoginRegPane()
{
    return (
        <div id="LoginRegPane" className="LoginRegPaneNotVisible">
            {/* check if user exist, load user palete or show login/reg button */}
            <div className="PaneHeading">Howdy, Visitor</div>
            <hr/>
            <NavLink to="/Login" className="PaneItem">Login</NavLink>
            <NavLink to="/Register" className="PaneItem">Register</NavLink>
        </div>
    );
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
            <button id="MobileNavButton" className="MenuButton" onClick={function()
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
                }}>
            </button>
        </div>
        <div id="GlobalNav" className="WebNav">
            <NavLink to="/Home" className="NavItem">Home</NavLink>
            <NavLink to="/Dashboard" className="NavItem">Dashboard</NavLink>
            <NavLink to="/Tools" className="NavItem">Tools</NavLink>
            <NavLink to="/About" className="NavItem">About</NavLink>
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