import React, {useState, Component} from 'react'
import { AuthContext } from "../AuthContext.jsx";
import axios from 'axios'

const Axios = axios.create({ 
    baseURL: 'http://localhost/omcms-server/',
});

function NewEvent(props)
{
    const initialState = {
        EventInfo:{
            EvntID:'',
            EvntTitle:'',
            EvntLink:''
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
            document.getElementById("NewEventContainer").className="EventContainer CreateEventHidden";
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
    <div id="NewEventContainer" className="EventContainer CreateEventHidden" onClick={()=>{
        document.getElementById("NewEventContainer").className="EventContainer CreateEventHidden"}}>
        <div id="CreateEventPane" className="EventPane" onClick={(event)=>event.stopPropagation()}>
            <div id="LoginPageHeading">Create New Event</div>
            <hr/>
            <form onSubmit={SubmitEventDetails}>
                <div id="LoginLog">{errorMsg}</div>
                <div className="InputContainer">
                    <label htmlFor="E_ID" className="FormLabels">Event ID</label>
                    <input id="E_ID" className="FormInputBox" name="EvntID" type="text" required 
                    placeholder="Enter Event ID" onChange={onChangeValue} value={state.EventInfo.EvntID}/>
                </div>
                <div className="InputContainer">
                    <label htmlFor="E_Title" className="FormLabels">Event Title</label>
                    <input id="E_Title" className="FormInputBox" name="EvntTitle" type="text" required 
                    placeholder="Enter Event Name" onChange={onChangeValue} value={state.EventInfo.EvntTitle}/>
                </div>
                <div className="InputContainer">
                    <label htmlFor="L_ID" className="FormLabels">Link</label>
                    <input id="L_ID" className="FormInputBox" name="EvntLink" type="text" required 
                    placeholder="Paste Link Here" onChange={onChangeValue} value={state.EventInfo.EvntLink}/>
                </div>
                <div className="ButtonHolder">
                    <button id="SubmitLogin" className="ButtonT1" type="submit">Create</button>
                </div>
            </form>
        </div>
    </div>);
}

class DashboardStaff extends Component
{   
    static contextType = AuthContext;

    state = {
        fname: '',
        lname: '',
        email: '',
        org_name: '',
        org_email: '',
        events_list: '',
        logs: {errMsg:'', scsMsg:''}
    }

    componentDidMount()
    {
        this.GetOrganisationName = this.context.GetOrganisationName;
        this.GetOrganisationName().then(Org => { 
            if(Org)
            this.setState({...this.state,
                org_name: Org.Name,
                org_email: Org.Email
            });  
        })
        this.GetEventsList();
    
        const {theUser, theOrganisation} = this.context.rootState;
        if(theUser)
            this.setState({...this.state,
                fname: theUser.fname,
                lname: theUser.lname,
                email: theUser.email
            });
        if(theOrganisation)
            this.setState({...this.state,
                org_name: theOrganisation.Name,
                org_email: theOrganisation.Email
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
        for(let event of this.state.events_list)
        {
            let tmp = event.link.substring(0,8);
            if(tmp !== "https://")
                event.link = "http://" + event.link;
            let EventPalette = <div className="EventPalette" key={i++}>
                <div className="DashboardSubheading1 EventPaletteHeader">{event.title}</div>
                <div className="EventPaletteFooter">
                    <a id="StartEventButton" className="EventButton" href={event.link} rel="noreferrer" target="_blank">Start</a>
                </div>
            </div>;
            EventList = [...EventList, EventPalette];
        }
        if(!EventList.length)
        {
            EventList.push(<div className="DashboardSubheading3" key="EmptyList">No Event<br/>Create One By Clicking (+) Button</div>)
        }

        return (
            <div id="DashboardStaff" className="DashBoardBodyCommon">
                <div className="ContentHeading">Dashboard</div>
                <div className="DashboardContentCommon">
                    <div id="StaffInfoPalette" className="DashboardPalette">
                        <div className="DashboardSubheading1">Welcome</div>
                        <div className="DashboardSubheading1">{this.state.fname} {this.state.lname}</div>
                        <div className="DashboardSubheading2">@{this.state.org_name}</div>
                        {errorMsg}
                        {successMsg}
                    </div>
                    <div id="StaffEventsPalette" className="DashboardPalette">
                        <div className="EventHeader">
                            <div className="DashboardSubheading1">Events</div>
                            <button className="EventHeaderButton" onClick={()=>{
                                if(document.getElementById("NewEventContainer"))
                                    document.getElementById("NewEventContainer").className="EventContainer CreateEventVisible";}
                            }/>
                            <NewEvent handle={this.childCallback}/>
                        </div>
                        <hr/>
                        <div id="StaffEventList" className="EventList">{EventList}</div>
                    </div>
                </div>
            </div>);
    }
}

export default DashboardStaff;