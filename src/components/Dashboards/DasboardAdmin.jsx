import React, { Component } from 'react'
import axios from 'axios'

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

function ToogleVisible(ElName) 
{
    let tmpEl = document.getElementById(ElName);
    if(tmpEl.className==="PaletteVisible")
        tmpEl.className="PaletteHidden";
    else
        tmpEl.className="PaletteVisible";
}

class DashboardAdmin extends Component
{
    state = {
        org_name: '',
        update_org_name:'',
        logs: {errMsg:'', scsMsg:''},
        staff_info:[]
    }

    componentDidMount()
    {
        this.GetOrganisationName();
        this.GetStaffDetails();
    }

    GetOrganisationName = async (Org) => {
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const {data}= await Axios.get('Getters/GetOrgName.php');
            this.setState({
                ...this.state,
                org_name:data.organisation_name
            })
            return data.organisation_name;
        }
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

    SetOrganisationName = async (OrgName) => {
        const loginToken = localStorage.getItem('loginToken');

        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const UpdateLog = await Axios.post('Setters/SetOrgName.php',{
                organisation_name: OrgName
            });
            return UpdateLog.data;
        }
        return null;
    }

    onChangeValue = (e) => 
    {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    submitForm = async (event) => 
    {
        event.preventDefault();
        const data = await this.SetOrganisationName(this.state.update_org_name);
        if(data.success)
        {
            this.setState({...this.state, 
                org_name: this.state.update_org_name, 
                update_org_name:'',
                logs : {...this.state.logs,
                    successMsg:data.message,
                    errorMsg:''}
            });
        }
        else
        {
            this.setState({
                ...this.state,
                logs : {...this.state.logs,
                    successMsg:'',
                    errorMsg:data.message}
            });
        }
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
        
        let StaffInfo = [], MemberInfo=[];
        let i = 0;
        for(let staffMem of this.state.staff_info)
        {
            let StaffInfoPalette = <tr key={i++}>
                <td className="ColStaffName">{staffMem.fname} {staffMem.lname}</td> 
                <td className="ColStaffEmail">{staffMem.email}</td>
            </tr>;
            StaffInfo = [...StaffInfo, StaffInfoPalette];
        }

        return (
            <div id="DashboardAdmin" className="DashBoardBodyCommon">
                <div className="ContentHeading">Dashboard</div>
                <div className="DashboardContentCommon">
                    <div id="OrgSetupPalette" className="DashboardPalette">
                        <div className="DashboardSubheading1">Welcome {this.state.org_name}</div>
                        <form onSubmit={this.submitForm}>
                            {errorMsg}
                            {successMsg}
                            <label htmlFor="RenOrg">New Name </label>
                            <input id="RenOrg" type="text" name="update_org_name" placeholder={this.state.org_name} onChange={this.onChangeValue}/>
                            <button type="submit">Rename</button>
                        </form>
                    </div>
                    <div id="StaffPalette" className="DashboardPalette" onClick={()=>ToogleVisible("StaffList")}>
                        <div className="DashboardSubheading1">List of Staff Members</div>
                        <div className="DashboardSubheading2">Number of Staff Members: {StaffInfo.length}</div>
                        <div id="StaffList" className="PaletteHidden">
                            <table id="StaffInfoTable">
                                <thead>
                                    <tr>
                                        <td className="ColStaffName">Name</td>
                                        <td className="ColStaffEmail">Email</td>
                                    </tr>
                                </thead>
                                <tbody>{StaffInfo}</tbody>
                            </table>
                        </div>
                    </div>
                    <div id="MemberPalette" className="DashboardPalette" onClick={()=>ToogleVisible("MemberList")}>
                        <div className="DashboardSubheading1">List of Members</div>
                        <div className="DashboardSubheading2">Number of Members: {StaffInfo.length}</div>
                        <div id="MemberList" className="PaletteHidden">{MemberInfo}</div>
                    </div>
                </div>
            </div>);
    }
}

export default DashboardAdmin;