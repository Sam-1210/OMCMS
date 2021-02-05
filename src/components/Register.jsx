import React, {useContext, useState} from 'react'
import { NavLink} from 'react-router-dom'
import {AuthContext} from './AuthContext.jsx'
import "./Styles/Register.css"

function Register()
{
    const {registerUser} = useContext(AuthContext);
    const initialState = {
        userInfo:{
            fname:'',
            lname:'',
            email:'',
            password:'',
            authority:''
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }
    
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="ErrMsgBox">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="ScsMsgBox">{state.successMsg}</div>;
    }

    return(
        <div id="Register">
            <div id="RegisterBox">
                <div id="RegisterUserIcon"></div>
                <div id="RegisterPageHeading">Register</div>
                <hr/>
                <form onSubmit={submitForm} noValidate>
                    <div id="RegisterLog">
                        {errorMsg}
                        {successMsg}
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="FirstName" className="FormLabels">First Name</label>
                        <input id="FirstName" className="FormInputBox" name="fname" required type="text" value={state.userInfo.fname} onChange={onChangeValue} placeholder="Enter Your First Name"/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="LastName" className="FormLabels">Last Name</label>
                        <input id="LastName" className="FormInputBox" name="lname" required type="text" value={state.userInfo.lname} onChange={onChangeValue} placeholder="Enter Your Last Name"/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="RegEmail" className="FormLabels">Email</label>
                        <input id="RegEmail" className="FormInputBox" name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter Your Email"/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="RegPassword" className="FormLabels">Password</label>
                        <input id="RegPassword" className="FormInputBox" name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password"/>
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="RegAuthority" className="FormLabels">Authority</label>
                        <input id="RegAuthority" className="FormInputBox" name="authority" required type="text" value={state.userInfo.authority} onChange={onChangeValue} placeholder="Enter Designation"/>
                    </div>
                    <div className="ButtonHolder">
                        <button id="SubmitRegister" className="ButtonT1" type="submit">SignUp</button>
                    </div>
                    <div className="ButtonHolder">
                        <NavLink to="/Login" id="SwitchLogin" className="ButtonT1">SignIn Instead</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register