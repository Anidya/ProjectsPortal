import React, { Component } from 'react'
import { load, updateDetails} from './api'
import '../design/app.css'
import FileViewer from 'react-file-viewer';
import DefaultPDF from '../files/DefaultPDF.jpg'

class MentorGroup extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : "",
            current: "",
            currentFile: "",
            show: false,
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

    setDate = str => (event) => {
        this.setState({
            [str]: event.target.value
        })
    } 

    dialog = (date) => (
        (this.state.show && <div className="modal">
            <section className="modal-main">
                <p style={{textAlign: 'center', fontWeight:'bold', fontSize: "20px"}}>Assign Task</p>
                <p style={{fontWeight: 'bold'}}> Set A Deadline</p>
                <div className="row ml-5 mt-4">
                    <p style={{width: "50%"}}>Choose a date</p>
                    <input 
                        name = "date"
                        type = "date"
                        value = {date}
                        onChange = {this.setDate("date")}>
                    </input>
                </div>
                <button className="randombutton ml-5" onClick={this.closeDialog}>Close</button>
                <button className="randombutton" onClick={this.assignTask}>Assign</button>
            </section>
        </div>)
    )
    
    sidebar = (group) => (
            <div>
                <p style={{fontSize: "20px", textAlign: "center"}}>Projects Details</p>
                <hr className = "line"/>
                
                { group.deadlines.title !== "" && <button className = "button" value="title" onClick={ (event) => this.handleClick(event, false, false)}> Title </button> }
                { group.deadlines.description !== ""  && <button className = "button" value="description" onClick={ (event) => this.handleClick(event, false, false)}>Description</button> }
                { group.deadlines.tech   && <button className = "button" value="tech" onClick={ (event) => this.handleClick(event, false, false)}>Technology Used</button> }
                { group.deadlines.synopsis   && <button className = "button" value="synopsis" onClick={ (event) => this.handleClick(event, false, true)}>Synopsis</button> }
                { group.deadlines.report   && <button className = "button" value="report" onClick={ (event) => this.handleClick(event, false, true)}>Report</button> }


                <hr style={{backgroundColor: "black"}}/>
                <p style={{fontSize: "20px", textAlign: "center" }} >Assign Task</p>
                <hr className = "line"/>
                
                { !group.deadlines.title && <button className = "button" value="title" onClick= { (event) => this.handleClick(event, true, false)}> Title </button> }
                { !group.deadlines.description && <button className = "button" value="description" onClick={ (event) => this.handleClick(event, true, false)}>Description</button> }
                { !group.deadlines.tech && <button className = "button" value="tech" onClick={ (event) => this.handleClick(event, true, false)}>Technology Used</button> }
                { !group.deadlines.synopsis   && <button className = "button" value="synopsis" onClick={ (event) => this.handleClick(event, true, true)}>Synopsis</button> }
                { !group.deadlines.report   && <button className = "button" value="report" onClick={ (event) => this.handleClick(event, true, true)}>Report</button> }

                <hr style={{backgroundColor: "black"}}/>
            </div>
    )

    handleClick = (event, show, file) => {
        const value = event.target.value;

        if(file)    
            this.setState({ currentFile: value,  show: show, current: "" })
        else
            this.setState({ current: value,  show: show, currentFile: "" })
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

    displayFromSidebar = (group, current, currentFile) => (
        <div>
            { current && group.fields[current] &&  ( <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>{current.charAt(0).toUpperCase() + current.slice(1)}</h4>
                    <h5>{group.fields[current]}</h5>
                </div>
            )}
            { currentFile &&  ( 
                <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>{currentFile.charAt(0).toUpperCase() + currentFile.slice(1)} of the Project</h4>
                    { group.fields[currentFile] ? (
                        <FileViewer fileType="pdf" filePath={`http://localhost:9090/${currentFile}/${group._id}`}/> 
                        ) : (
                        <h5>--- PROJECT DETAILS NOT UPLOADED ---</h5>    
                        )}
                </div>
            )}
        </div>
    )

    closeDialog = () => {
        this.setState({ 
            show: false,
            date: ""
        });
    };

    assignTask = () => {
        const {groupId, group, current, currentFile, date} = this.state;

        if(current){
            group.fields[current] = "--- PROJECT DETAILS NOT UPLOADED ---";
            group.deadlines[current] = date;
        }
        else
            group.deadlines[currentFile] = date;

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
            date: ""
        });
    }
    
    render() {
        const {group, current, currentFile, show, date} = this.state
        return (
            (group && <div className="row">
                
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    {this.displayFromSidebar(group, current, currentFile)}
                    {show && this.dialog(date)}
                </div>
            </div>)
        )
    }
}
export default MentorGroup;