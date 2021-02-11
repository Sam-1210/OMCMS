import React, {useContext} from 'react';
import { AuthContext } from "./AuthContext.jsx";
import Login from "./Login.jsx";

function Tools() 
{
    const {rootState} = useContext(AuthContext);
    const {isAuth} = rootState;

    if(isAuth)
    {
        return (<h1>Tools</h1>);
    }

    return (<Login></Login>);
}

export default Tools;