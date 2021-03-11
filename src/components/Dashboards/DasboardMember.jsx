import React, {useState, Component} from 'react'
import { AuthContext } from "../AuthContext.jsx";
import axios from 'axios'

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

function AddEvent(props)
{
    const initialState = {
        EventInfo:{
            OrgnrID:'',
            EvntID:'',
        },
        errorMsg:'',
    }

    const [state, setState] = useState(initialState);

    const onChangeValue = (e) => 
    {
        setState({
            ...state,
            EventInfo:{
                ...state.EventInfo,
                [e.target.name]:e.target.value
            }
        });
    }

    const AddEventDetails = async (EvntInfo)=>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const {data}= await Axios.post('Setters/AddEvent.php', EvntInfo);
            return {success:data.success, log:data.message};
        }
    }

    const SubmitEventDetails = async (event) => {
        event.preventDefault();
        const data = await AddEventDetails(state.EventInfo);
        if(data.success)
        {
            setState({...initialState});
            props.handle();
            document.getElementById("AddEventContainer").className="EventContainer CreateEventHidden";
        }
        else
            setState({...state, errorMsg:data.log});
    }


    let errorMsg = '';
    if(state.errorMsg)
    {
        errorMsg = <div className="ErrMsgBox">{state.errorMsg}</div>;
    }

    return(
    <div id="AddEventContainer" className="EventContainer CreateEventHidden" onClick={()=>{
        document.getElementById("AddEventContainer").className="EventContainer CreateEventHidden"}}>
        <div id="AddEventPane" className="EventPane" onClick={(event)=>event.stopPropagation()}>
            <div id="LoginPageHeading">Add New Event</div>
            <hr/>
            <form onSubmit={SubmitEventDetails}>
                <div id="LoginLog">{errorMsg}</div>
                <div className="InputContainer">
                    <label htmlFor="I_ID" className="FormLabels">Organiser ID</label>
                    <input id="I_ID" className="FormInputBox" name="OrgnrID" type="text" required 
                    placeholder="Enter Organiser ID" onChange={onChangeValue} value={state.EventInfo.OrgnrID}/>
                </div>
                <div className="InputContainer">
                    <label htmlFor="E_ID" className="FormLabels">Event ID</label>
                    <input id="E_ID" className="FormInputBox" name="EvntID" type="text" required 
                    placeholder="Enter Event ID" onChange={onChangeValue} value={state.EventInfo.EvntID}/>
                </div>
                <div className="ButtonHolder">
                        <button id="SubmitLogin" className="ButtonT1" type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>);
}

class DashboardMember extends Component
{   
    static contextType = AuthContext;

    state = {
        fname: '',
        lname: '',
        email: '',
        events_list: '',
        logs: {errMsg:'', scsMsg:''}
    }
    
    componentDidMount()
    {
        this.GetEventsList();
        const {theUser} = this.context.rootState;
        if(theUser)
            this.setState({...this.state,
                fname: theUser.fname,
                lname: theUser.lname,
                email: theUser.email
            });
    }

    childCallback = ()=>{
        this.GetEventsList();
    }

    GetEventsList = async () => {
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken)
        {
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;
            const {data}= await Axios.get('Getters/GetEventList.php');
            if(data.Payload)
            {
                this.setState({
                    ...this.state,
                    events_list:[...data.Payload]
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
        
        let EventList = [];
        let i = 0;
        for(let events of this.state.events_list)
        {
            let EventPalette = <tr key={i++}>
                <td className="ColStaffName">{events.title}</td> 
                <td className="ColStaffName">{events.fname}</td>
                <td className="ColStaffName">{events.lname}</td>
                <td className="ColStaffName">{events.email}</td>
                <td className="ColStaffEmail">{events.link}</td>
            </tr>;
            EventList = [...EventList, EventPalette];
        }

        if(!EventList.length)
        {
            EventList.push(<div className="DashboardSubheading3" key="EmptyList">No Event<br/>Add One By Clicking (+) Button</div>)
        }

        return (
            <div id="DashboardMember" className="DashBoardBodyCommon">
                <div className="ContentHeading">Dashboard</div>
                <div className="DashboardContentCommon">
                    <div id="OrgSetupPalette" className="DashboardPalette">
                        {errorMsg}
                        {successMsg}
                        <div className="DashboardSubheading1">Welcome {this.state.fname}</div>
                        <div className="DashboardSubheading2">Info : {this.state.fname} {this.state.lname}</div>
                    </div>
                    <div id="MemberEventsPalette" className="DashboardPalette">
                        <div className="EventHeading">
                            <div className="DashboardSubheading1">Events</div>
                            <button className="EventHeadingButton" onClick={()=>{
                                    if(document.getElementById("AddEventContainer"))
                                    document.getElementById("AddEventContainer").className="EventContainer CreateEventVisible";}
                            }/>
                            <AddEvent handle={this.childCallback}/>
                        </div>
                        <hr/>
                        <div id="MemberEventList">{EventList}</div>
                    </div>
                </div>
            </div>);
    }
}

export default DashboardMember;