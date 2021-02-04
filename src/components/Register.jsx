import React, {useContext, useState} from 'react'
import {AuthContext} from './AuthContext.jsx'

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
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    return(
        <div className="_loginRegister">
            <h1>Sign Up</h1>
            <form onSubmit={submitForm} noValidate>
                <div className="form-control">
                    <label>First Name</label>
                    <input name="fname" required type="text" value={state.userInfo.fname} onChange={onChangeValue} placeholder="Enter your first name"/>
                </div>
                <div className="form-control">
                    <label>Last Name</label>
                    <input name="lname" required type="text" value={state.userInfo.lname} onChange={onChangeValue} placeholder="Enter your last name"/>
                </div>
                <div className="form-control">
                    <label>Email</label>
                    <input name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password"/>
                </div>
                <div className="form-control">
                    <label>Authority</label>
                    <input name="authority" required type="text" value={state.userInfo.authority} onChange={onChangeValue} placeholder="Enter Designation"/>
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="form-control">
                    <button>Login Instead</button>
                </div>
            </form>
        </div>
    );
}

export default Register