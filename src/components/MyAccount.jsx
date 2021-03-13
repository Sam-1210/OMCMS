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
        authority:'',
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
                successMsg:data.message,
                errorMsg:''
            });
        }
        else
        {
            this.setState({
                ...this.state,
                successMsg:'',
                errorMsg:data.message
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

    render()
    {
        let OrgName = '';
        if(this.state.authority === 'admin')
            OrgName = 'OMCMS'; ///get and set state.
        
        return(
            <div id="MyAccount">
                <div className="ContentHeading">MyAccount</div>
                <div className="MyAccountLogger">                    
                    {this.state.successMsg}
                    {this.state.errorMsg}
                </div>
                <form onSubmit={this.submitChangeName}>
                    <div className="InputContainer">
                        <label className="FormLabels">Name : </label>
                        <input id="ChangeFname" className="FormInputBox" name="changed_fname" type="text" required placeholder={this.state.fname} onChange={this.onChangeValue} />
                        <input id="ChangeLname" className="FormInputBox" name="changed_lname" type="text" required placeholder={this.state.lname} onChange={this.onChangeValue} />
                    </div>
                    <button type="submit">Update Name</button>
                </form>
                <div>Email : {this.state.email}</div>
                {OrgName}
                <div onClick={this.submitChangeName}>hii</div>
            </div>
        );
    }   
}

export default MyAccount;