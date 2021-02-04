import React, {useContext, useState} from 'react'
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
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg)
    {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    return(
        <div id="Login">
            <div id="LoginBox">
                <div className="PageHeading">Login</div>
                <form  onSubmit={submitForm} noValidate>
                    <div className="InputContainer">
                        <label htmlFor="UserEmail" className="FormLabels">Registered Email</label>
                        <input id="UserEmail" name="email" type="email" required placeholder="Enter Your Email" value={state.userInfo.email} onChange={onChangeValue} />
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="UserPassword" className="FormLabels">Password</label>
                        <input id="UserPassword" name="password" type="password" required placeholder="Enter your password" value={state.userInfo.password} onChange={onChangeValue} />
                    </div>
                    {errorMsg}
                    {successMsg}
                    <div className="InputContainer">
                        <button type="submit">Sign-In</button>
                    </div>
                    <div className="form-control">
                        <button>Sign-Up Instead</button>
                    </div>
                </form>
                </div>
        </div>
    );
}

export default Login;