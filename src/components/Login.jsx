import React, {useContext, useState} from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from './AuthContext.jsx'
import "./Styles/Global.css"
import "./Styles/Login.css"

function Login()
{
    const {loginUser, isLoggedIn} = useContext(AuthContext);
    const initialState = {
        userInfo:{
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }

    const [state, setState] = useState(initialState);

    const onChangeValue = (e) => 
    {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }

    const submitForm = async (event) => 
    {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token)
        {
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
            
        }
        else
        {
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    let successMsg = '';
    let errorMsg = '';

    if(state.errorMsg)
    {
        errorMsg = <div className="ErrMsgBox">{state.errorMsg}</div>;
    }
    if(state.successMsg)
    {
        successMsg = <div className="ScsMsgBox">{state.successMsg}</div>;
    }

    return(
        <div id="Login">
            <div id="LoginBox">
                <div id="LoginUserIcon"></div>
                <div id="LoginPageHeading">Login</div>
                <hr/>
                <form  onSubmit={submitForm} noValidate>
                    <div id="LoginLog">
                        {errorMsg}
                        {successMsg}
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="UserEmail" className="FormLabels">Registered Email</label>
                        <input id="UserEmail" className="FormInputBox" name="email" type="email" required placeholder="Enter Your Email" value={state.userInfo.email} onChange={onChangeValue} />
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="UserPassword" className="FormLabels">Password</label>
                        <input id="UserPassword" className="FormInputBox" name="password" type="password" required placeholder="Enter your password" value={state.userInfo.password} onChange={onChangeValue} />
                    </div>
                    <div className="ButtonHolder">
                        <button id="SubmitLogin" className="ButtonT1" type="submit">SignIn</button>
                    </div>
                    <div className="ButtonHolder">
                        <NavLink to="/Register" id="SwitchRegister" className="ButtonT1">SignUp Instead</NavLink>
                    </div>
                </form>
                </div>
        </div>
    );
}

export default Login;