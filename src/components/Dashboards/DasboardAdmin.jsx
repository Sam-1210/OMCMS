import React, { Component } from 'react'
import axios from 'axios'

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

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
        
        let z = [];
        let i = 0;
        for(let staffMem of this.state.staff_info)
        {
            let x = <div key={i++}>{staffMem.fname} {staffMem.lname} {staffMem.email}</div>;
            z = [...z, x];
        }

        return (
            <div id="DashboardAdmin" className="DashBoardBodyCommon">
                <div className="DashboardHeading">Dashboard</div>
                <div className="DashboardContentCommon">
                    <div id="OrgSetupPallete">
                        <div>Welcome {this.state.org_name}</div>
                        <form onSubmit={this.submitForm}>
                            {errorMsg}
                            {successMsg}
                            <label htmlFor="RenOrg">New Name </label>
                            <input id="RenOrg" type="text" name="update_org_name" placeholder="Enter New Name" value={this.state.update_org_name} onChange={this.onChangeValue}/>
                            <button type="submit">Rename</button>
                        </form>
                    </div>
                    <div>
                        Manage Staff
                        {z}
                        {/* Also handle pending requests */}
                    </div>
                </div>
            </div>);
    }
}

export default DashboardAdmin;