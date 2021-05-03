import React, { Component } from 'react'
import { load, updateDetails} from './api'
import '../design/app.css'
import FileViewer from 'react-file-viewer';

class SupervisorGroups extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : "",
            current: "",
            currentFile: "",
            show: false,
            showFile: false,
            date: ""
        }
    }

    componentDidMount = () => {
        this.groupData = new FormData()
        const groupId = this.props.match.params.groupId;
        load(groupId)
        .then(data => {
            if(data.error)
                console.log(data.error)
            else 
                this.setState({
                    group: data,
                    groupId: groupId
                })
        })
    }
    
    dialog = (date, time) => (
        (this.state.show && <div className="modal">
            <section className="modal-main">
                <p style={{textAlign: 'center', fontWeight:'bold', fontSize: "20px"}}>Schedule VIVA</p>
                <p style={{fontWeight: 'bold'}}> Set A Deadline </p>
                <div className="row ml-5 mt-4">
                    <p style={{width: "50%", fontWeight: 'bold'}}>Choose a date</p>
                    <input 
                        name = "date"
                        type = "date"
                        value = {date}
                        onChange = {this.setDate("date")}
                        >
                    </input>
                    <p style={{width: "50%", fontWeight: 'bold'}}>Choose a time</p>
                    <input 
                        name = "time"
                        type = "time"
                        value = {time}
                        onChange = {this.setDate("time")}
                        >
                    </input>
                </div>
                <button className="randombutton ml-5" onClick={this.closeDialog}>Close</button>
                <button className="randombutton" onClick={this.assignTask}>Assign</button>
            </section>
        </div>)
    )

    setDate = str => (event) => {
        this.setState({
            [str]: event.target.value
        })
    }

    sidebar = (group) => (
            <div>
                <p style={{fontSize: "20px", textAlign: "center"}}>Projects Details</p>
                <hr className = "line"/>
                
                { group.deadlines.title !== "" && <button className = "button" value="title" onClick={ (event) => this.handleClick(event, false)}> Title </button> }
                { group.deadlines.description !== ""  && <button className = "button" value="description" onClick={ (event) => this.handleClick(event, false)}>Description</button> }
                { group.deadlines.tech   && <button className = "button" value="tech" onClick={ (event) => this.handleClick(event, false)}>Technology Used</button> }
                { group.deadlines.synopsis   && <button className = "button" value="synopsis" onClick={ (event) => this.handleClick(event, true)}>Synopsis</button> }
                { group.deadlines.report   && <button className = "button" value="report" onClick={ (event) => this.handleClick(event, true)}>Report</button> }


                <hr style={{backgroundColor: "black"}}/>
                <button className = "button" value="VIVA" onClick={ (event) => this.handleClick(event, false)}>VIVA</button>
                
                <hr style={{backgroundColor: "black"}}/>
            </div>
    )

    handleClick = (event, file) => {
        const value = event.target.value;

        if(file)    
            this.setState({ currentFile: value, current: "", show: false, showFile: false })
        else
            this.setState({ current: value, currentFile: "", show: false, showFile: false })
    }

    mainGroupDetails = group => (
        <div className="container">
            <h2 style={{fontWeight: 'bold'}}>Group Details</h2>
            <h5 style={{marginTop: "5%", fontWeight: 'bold',textDecorationLine: 'underline'}}>Group Id: {group.id}</h5>
            <h5 style={{marginTop: "4%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Students Details</h5>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    { group.students.map((student, i) => (
                        <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{group.students[i].name}</td>
                        <td>{group.students[i].email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    displayFromSidebar = (group, current, currentFile, showFile) => (
        <div>
            { current && group.fields[current] &&  ( <div>
                    { current === "tech" ? <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Technology Used</h4> :
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}> {current.charAt(0).toUpperCase() + current.slice(1)}</h4> }
                    <p style = {{textAlign: "end"}}>Deadline:    {group.deadlines[current]}</p>
                    <h5 style={{marginTop: "2%", marginLeft: "1%"}}>{group.fields[current]}</h5>
                </div>
            )}
            { currentFile &&  ( 
                <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>{currentFile.charAt(0).toUpperCase() + currentFile.slice(1)}</h4>
                    <p style = {{textAlign: "end"}}>Deadline:    {group.deadlines[currentFile]}</p>
                    {showFile && <div className="ml-4"> <FileViewer fileType="pdf" filePath={`http://localhost:9090/${currentFile}/${group._id}`}/> </div>}
                    
                    { group.fields[currentFile] ? <div> 
                        { !showFile && <button className="btn btn-raised btn-primary ml-4 mt-4" onClick = {event => this.setState({showFile: true}) }>Display File</button> } </div>
                        :   <h5 style={{marginTop: "2%", marginLeft: "1%"}}>--- PROJECT DETAILS NOT UPLOADED ---</h5>    
                    }
                </div>
            )}
            { current === "VIVA" && (   <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}> {current.charAt(0).toUpperCase() + current.slice(1)}</h4> 
                    { group.viva ? <div> 
                            <p style= {{fontWeight: 'bold', marginLeft: "5%"}} >Scheduled Time and Date : {group.viva}</p> 
                            <button className="btn btn-raised btn-primary ml-4 mt-4">Start Video Call</button> 
                        </div> 
                            : <button className="btn btn-raised btn-primary ml-4 mt-4" onClick = {event => this.setState({show: true})} >Schedule VIVA</button> }
                </div>
            )}

        </div>
    )

    closeDialog = () => { 
        this.setState({ 
            show: false,
            date: "",
            time: ""
        });
    };

    assignTask = () => {
        const {groupId, group, time, date} = this.state;

        const str = time + " " + date;
        group.viva = str;

        this.setState({
            group
        })

        updateDetails(groupId, group)
        .then(data => {
            if(data.error)
                console.log({"Error": data.error});
            else
                this.setState({group: data});
        })

        this.setState({ 
            show: false,
            date: "",
            time: ""
        });
    }
    
    render() {
        const {group, current, currentFile, date, time, show, showFile} = this.state
        return (
            (group && <div className="row">
                
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    {this.displayFromSidebar(group, current, currentFile, showFile)}
                    {show && this.dialog(date, time)}
                </div>
            </div>)
        )
    }
}
export default SupervisorGroups;