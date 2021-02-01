import {NavLink} from "react-router-dom"
import "./GlobalHeader.css"
import WebIcon from "../media/WebIcon.png"

function GlobalHeader()
{
    return <div className="GlobalHeader">
        <div id="WebTitle">
            <div id="HeaderIcon">
                <img src={WebIcon} id="HeaderImg" alt="Failed to Load Logo"/>
            </div>
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
            <div className="NavItem"><NavLink to="/Home" ><input id="NavHome" className="NavButtons" type="button" value="Home" ></input></NavLink></div>
            <div className="NavItem"><NavLink to="/Dashboard" ><input id="NavDashboard" className="NavButtons" type="button" value="Dashboard" ></input></NavLink></div>
            <div className="NavItem"><NavLink to="/Tools" ><input id="NavTools" className="NavButtons" type="button" value="Tools" ></input></NavLink></div>
            <div className="NavItem"><NavLink to="/About" ><input id="NavAbout" className="NavButtons" type="button" value="About" ></input></NavLink></div>
            <div className="NavItem"><NavLink to="/Login" ><input id="NavUser" className="NavButtons" type="button" value="Login/Register" ></input></NavLink></div>
        </div>
      </div>;
}

export default GlobalHeader;