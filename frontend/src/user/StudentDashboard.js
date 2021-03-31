import React, { Component } from 'react'
import { load, updateDetails, updateDetailsFiles } from './api'
import { isAuthenticated } from '../auth'

class StudentDashborad extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : "",
            report: "",
            current: "",
            currentFile: "",
            show: false
        }
    }

    componentDidMount = () => {
        this.groupData = new FormData()
        const groupId = isAuthenticated().user.group;
        load(groupId)
        .then(data => {
            if(data.error)
                console.log(data.error)
            else 
                this.setState({
                    group: data,
                    groupId: groupId,
                    report: data.report
                })
        })
    }
 
    sidebar = (group) => (
        <div>
            <p style={{fontSize: "20px", textAlign: "center"}}>Projects Details</p>
            <hr className = "line"/>
            
            { group.deadlines.title !== "" && <button className = "button" onClick={ this.handleClick("title")}> Title </button> }
            { group.deadlines.description !== ""  && <button className = "button"  onClick={ this.handleClick("description")}>Description</button> }
            { group.deadlines.report !== ""  && <button className = "button"  onClick={ this.handleClickFile("report")}>Report</button> }
            
            <hr style={{backgroundColor: "black"}}/>
        </div>
    )

    handleClick = (str) => event => {
        if(this.state.show)
            alert("Please Fill in the Required Fields");
        else
            this.setState({ 
                current: str,
                currentFile: ""
            })
    }

    handleClickFile = (str) => event => {
        if(this.state.show)
            alert("Please Fill in the Required Fields");
        else
            this.setState({ 
                currentFile: str,
                current: ""
            })
    }

    displayFromSidebar = (group, current, show) => (
        (current && <div className="container">
            <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>{current.charAt(0).toUpperCase() + current.slice(1)} of the Project</h4>
            <h5>{group.fields[current]}</h5>
            {show && ( 
                <input className="form-control mt-5" type="text" value={group.fields[current]} name={current} placeholder="ENTER THE DETAILS"  onChange={this.handleChange}></input> 
            )}
            { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-1 mt-4"  value ={group.deadlines[current]} onClick={this.handleEdit}>Edit</button> )}
            { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-5 mt-4" onClick={this.handleSave}>Save</button> )}
        </div> )
    )

    displayFilesFromSidebar = (group, report, currentFile, show) => (
        (currentFile && <div className="container">
            <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>{currentFile.charAt(0).toUpperCase() + currentFile.slice(1)} of the Project</h4>
                { show && ( 
                    <input className="form-control mt-5" type="file" name={currentFile} onChange={this.handleChange}></input>
                )} 
            { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-1 mt-4" value ={group.deadlines[currentFile]} onClick={this.handleEdit}>Edit</button> )}
            { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-5 mt-4" onClick={this.handleSave}>Save</button> )}
        </div> )
    )

    handleChange = (event) => {
        const {group, current} = this.state;

        if(current){
            group.fields[event.target.name] = event.target.value;
            this.setState({
                group: group
            })
        }
        else{
            const name = event.target.name;
            const value = event.target.files[0];
            
            this.groupData.set(name,value)
        }
    }

    checkDeadline = () => {
        const {group, current, currentFile} = this.state;

        let deadline = (current === "" ? group.deadlines[currentFile] : group.deadlines[current]);
        let today = new Date();
        let date = today.getDate();   
            date = ( date<10 ?  "0"+date.toString()  : date.toString() );
        let month = today.getMonth() + 1;
            month = ( month<10 ? "0"+month.toString() : month.toString() );
        let year = today.getFullYear();
        today = year.toString() + '-' + month.toString() + '-' + date.toString();

        if(today<=deadline)
            return true;
        return false;
    }

    handleEdit = () => {
        const {group, current} = this.state;
        if(current){
            if(group.fields[current] === "--- PROJECT DETAILS NOT UPLOADED ---"){
                group.fields[current] = "";
                this.setState({ group: group });
            }
        }
        this.setState({ show: true});
    }

    handleSave = (event) => {
        event.preventDefault();
        const {group, groupId, current} = this.state;

        if(current){
            if(group.fields[current] === ""){
                alert("Please fill in the required fields");
            }
            else{
                updateDetails(groupId, group)
                .then(data => {
                    if(data.error)
                        console.log(data.error);
                    else
                        this.setState({
                            group: data,
                            show: false
                        })
                })
            }
        }
        else{
            updateDetailsFiles(groupId, this.groupData)
            .then(data => {
                if(data.error)
                    console.log(data.error);
                else
                    console.log("set");
            })
        }
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

    render() {
        const {group, current, currentFile, report, show} = this.state
        return ( 
            (group && <div className="row"> 
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    {this.displayFromSidebar(group, current, show)}
                    {this.displayFilesFromSidebar(group, report, currentFile, show)}
                </div>
            </div>)
        )
    }
}
export default StudentDashborad;