import React, { createContext,Component } from "react";
import axios from 'axios'
export const AuthContext = createContext();

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

class AuthContextProvider extends Component{
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
    }

    constructor()
    {
        super();
        this.isLoggedIn();
    }

    logoutUser = () => 
    {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => 
    {
        const register = await Axios.post('Register.php',{
            fname:user.fname,
            lname:user.lname,
            email:user.email,
            password:user.password,
            authority:user.authority, 
        });
        return register.data;
    }


    loginUser = async (user) => 
    {
        const login = await Axios.post('Login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            const {data} = await Axios.get('AccountInfo.php');

            if(data.success && data.user)
            {
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
            }
        }
    }

    render(){
        const contextValue = {
            rootState:this.state,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <AuthContext.Provider value={contextValue}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}

export default AuthContextProvider;