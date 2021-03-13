import React, { Component} from 'react'
import { AuthContext } from "./AuthContext.jsx";
import axios from 'axios'
import "./Styles/MyAccount.css"

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

class MyAccount extends Component
{
    static contextType = AuthContext;

    state = {
        fname: '',
        lname: '',
        email: '',
        changed_fname:'',
        changed_lname:'',
        changed_password:'',
        changed_confirm_password:'',
        authority:'',
        org_name:'',
        update_org_name:'',
        org_email:'',
        update_org_email:'',
        logs: {errMsg:'', scsMsg:''}
    }

    componentDidMount()
    {
        this.ChangeName = this.context.ChangeName;
        const {theUser} = this.context.rootState;
        if(theUser)
            this.setState({...this.state,
                fname: theUser.fname,
                lname: theUser.lname,
                email: theUser.email,
                authority: theUser.authority
            });
        if(theUser.authority === 'admin' || theUser.authority === 'staff')
        {
            
            this.GetOrganisationName = this.context.GetOrganisationName;
            this.GetOrganisationName().then(Org => { 
                if(Org)
                this.setState({...this.state,
                    org_name: Org.Name,
                    org_email: Org.Email
                });  
            });
        }
    }
    /***************************************Change Organization Name***********************************************************/
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

    submitChangeOrgName = async (event) => {
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
    /***************************************Change Organization Email***********************************************************/
    SetOrganisationEmail = async (OrgEmail) => {
        const loginToken = localStorage.getItem('loginToken');

        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const UpdateLog = await Axios.post('Setters/SetOrgEmail.php',{
                organisation_email: OrgEmail
            });
            return UpdateLog.data;
        }
        return null;
    }

    submitChangeOrgEmail = async (event) => {
        event.preventDefault();
        const data = await this.SetOrganisationEmail(this.state.update_org_email);
        if(data.success)
        {
            this.setState({...this.state, 
                org_email: this.state.update_org_email, 
                update_org_email:'',
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
    /**************************************Change User Password********************************************************/
    SetNewPassword = async (Req) => {
        const loginToken = localStorage.getItem('loginToken');

        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const UpdateLog = await Axios.post('Setters/SetNewPassword.php',{
                Password: Req.password,
                ConfrimPassword: Req.confirmPassword,
            });
            return UpdateLog.data;
        }
        return null;
    }

    submitChangePassword = async (event) => 
    {
        event.preventDefault();
        const data = await this.SetNewPassword({
            password:this.state.changed_password,
            confirmPassword:this.state.changed_confirm_password
        });
        if(data.success)
        {
            this.setState({...this.state, 
                changed_password:'',
                changed_confirm_password:'',
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
    /***************************************Change User Name***********************************************************/
    submitChangeName = async (event) => 
    {
        event.preventDefault();
        const data = await this.ChangeName({fname:this.state.changed_fname ,lname:this.state.changed_lname});
        if(data.success)
        {
            this.setState({
                ...this.state,
                fname:this.state.changed_fname,
                lname: this.state.changed_lname,
                changed_fname:'',
                changed_lname:'',
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

    onChangeValue = (e) => 
    {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }
    /***************************************Render***********************************************************/
    render()
    {       
        let OtherElements = [];
        if(this.state.authority === 'admin')
        {
            OtherElements.push(
            <form key='1' className="MyAccountRow" onSubmit={this.submitChangeOrgName}>
                <div className="RowLabel">Organisation Name</div>
                <div className="FormInput">
                    <input id="ChangeOrgName" className="FormInputBox" name="update_org_name" type="text" required 
                    placeholder={this.state.org_name} value={this.state.update_org_name} onChange={this.onChangeValue} />
                    <button type="submit">Update</button>
                </div>
            </form>);
        }

        if(this.state.authority === 'staff')
        {
            OtherElements.push(
            <form key='2' className="MyAccountRow"  onSubmit={this.submitChangeOrgEmail}>
                <div className="RowLabel">Organisation Email</div>
                <div className="FormInput">
                    <input id="AddOrg" className="FormInputBox" name="update_org_email" type="text" required 
                    placeholder={this.state.org_email} value={this.state.update_org_email} onChange={this.onChangeValue} />
                    <button type="submit">Add</button>
                </div>
            </form>);
        }
        
        return(
            <div id="MyAccount">
                <div className="ContentHeading">MyAccount</div>
                <div id="MyAccountBody">
                    <div className="MyAccountLogger">                    
                        {this.state.logs.successMsg}
                        {this.state.logs.errorMsg}
                    </div>
                    <div className="MyAccountRow">
                        <div className="RowLabel">Email</div>
                        <div className="RowTextData">{this.state.email}</div>
                    </div>
                    <form className="MyAccountRow" onSubmit={this.submitChangeName}>
                        <label className="RowLabel">Name</label>
                        <div className="FormInput">
                            <input id="ChangeFname" className="FormInputBox" name="changed_fname" type="text" required 
                            placeholder={this.state.fname} value={this.state.changed_fname} onChange={this.onChangeValue} />
                            <input id="ChangeLname" className="FormInputBox" name="changed_lname" type="text" required 
                            placeholder={this.state.lname} value={this.state.changed_lname} onChange={this.onChangeValue} />
                            <button type="submit">Update</button>
                        </div>
                    </form>
                    <form className="MyAccountRow" onSubmit={this.submitChangePassword}>
                        <label className="RowLabel">Password</label>
                        <div className="FormInput">
                            <input id="ChangePass" className="FormInputBox" name="changed_password" type="password" required 
                            placeholder="New Password" value={this.state.changed_password} onChange={this.onChangeValue} />
                            <input id="ConfirmPass" className="FormInputBox" name="changed_confirm_password" type="password" required 
                            placeholder="Confirm New Password" value={this.state.changed_confirm_password} onChange={this.onChangeValue} />
                            <button type="submit">Update</button>
                        </div>
                    </form>
                    {OtherElements}
                </div>
            </div>
        );
    }   
}

export default MyAccount;