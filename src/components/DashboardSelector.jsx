import React, {useContext} from 'react';
import { AuthContext } from "./AuthContext.jsx";
import DashboardAdmin from "./Dashboards/DasboardAdmin.jsx"
import DashboardStaff from "./Dashboards/DasboardStaff.jsx"
import DashboardMember from "./Dashboards/DasboardMember.jsx"
import "./Styles/Dashboard.css"

function DashboardSelector() 
{
    const {rootState} = useContext(AuthContext);
    const {isAuth, theUser} = rootState;

    if(isAuth)
    {
        var UserType = theUser.authority;
        if(UserType === 'admin')
            return <DashboardAdmin></DashboardAdmin>
        else if(UserType === 'staff')
            return <DashboardStaff></DashboardStaff>
        else if(UserType === 'member')
            return <DashboardMember></DashboardMember>
        else
        {
            return (
                <div><h1>Something Went Wrong!!!</h1></div>
            );
        }
    }
    return (<div><h1>You're not Allowed to Access this Page at The Moment</h1></div>);
}

export default DashboardSelector;