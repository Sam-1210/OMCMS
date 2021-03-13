import React, { Component } from 'react'
import { AuthContext } from "../AuthContext.jsx";
import axios from 'axios'
import ContactIco from "../../media/contact.png"

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

class DashboardAdmin extends Component
{
    static contextType = AuthContext;

    state = {
        org_name: '',
        logs: {errMsg:'', scsMsg:''},
        staff_info:[]
    }

    componentDidMount()
    {
        this.GetOrganisationName = this.context.GetOrganisationName;
        this.GetOrganisationName().then(Org => { 
            if(Org)
            this.setState({...this.state,
                org_name: Org.Name
            });  
        })
        this.GetStaffDetails();
    }

    GetStaffDetails = async (Org) => {
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const {data}= await Axios.get('Getters/GetStaffInfo.php');
            if(data.Payload)
            {
                this.setState({
                    ...this.state,
                    staff_info:[...data.Payload]
                });
            }
        }
    }

    onChangeValue = (e) => 
    {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    render()
    {
        let successMsg = '';
        let errorMsg = '';
    
        if(this.state.logs.errorMsg)
        {
            errorMsg = <div>{this.state.logs.errorMsg}</div>;
        }
        if(this.state.logs.successMsg)
        {
            successMsg = <div>{this.state.logs.successMsg}</div>;
        }
        
        let StaffInfo = [];
        let i = 1;
        for(let staffMem of this.state.staff_info)
        {
            let StaffInfoPalette = <div key={i++} className="StaffListRow">
                <div id="StaffMemDet">
                    <div id="StaffIcon"></div>
                    <div id="StaffName"  className="DashboardSubheading2">{staffMem.fname} {staffMem.lname}</div>
                </div>
                <a id="ContactStaffButton" className="EventButton" href={"mailto://"+staffMem.email} rel="noreferrer" target="_blank">
                        <img id="ContactStaffIco" src={ContactIco} alt="Contact"/>
                </a>
            </div>;
            StaffInfo = [...StaffInfo, StaffInfoPalette];
        }

        if(!StaffInfo.length)
        {
            StaffInfo.push(<div className="DashboardSubheading3" key="EmptyList">No Member is Registered with Your Organisation</div>)
        }

        return (
            <div id="DashboardAdmin" className="DashBoardBodyCommon">
                <div className="ContentHeading">Dashboard</div>
                <div className="DashboardContentCommon">
                    <div id="OrgInfoPalette" className="DashboardPalette">
                        <div className="DashboardSubheading1">Welcome<br/>{this.state.org_name}</div>
                        {errorMsg}
                        {successMsg}
                    </div>
                    <div id="StaffDetailsPalette" className="DashboardPalette">
                        <div>
                            <div className="DashboardSubheading1">List of Staff Members</div>
                            <div className="DashboardSubheading3">Number of Staff Members: {StaffInfo.length}</div>
                            <hr/>
                        </div>
                        <div id="StaffList"  className="EventList">
                            {StaffInfo}
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default DashboardAdmin;