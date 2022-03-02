import React, {useContext} from 'react';
import { AuthContext } from "./AuthContext.jsx";
import Login from "./Login.jsx";
import "./Styles/Tools.css"

function Tools() 
{
    const {rootState} = useContext(AuthContext);
    const {isAuth} = rootState;

    if(isAuth)
    {
        return (
            <div id="Tools">
                <div className="ContentHeading">Tools</div>
                <div>Tools are in development right now, will be available with next releases.</div>
            </div>);
    }

    return (<Login></Login>);
}

export default Tools;