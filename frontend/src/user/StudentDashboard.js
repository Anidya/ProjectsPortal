import React, { Component } from 'react'
import { load, updateDetailsFiles } from './api'
import { isAuthenticated } from '../auth'
import FileViewer from 'react-file-viewer';


class StudentDashborad extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : "",
            current: "",
            currentFile: "",
            show: false,
            showFile: false
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
            
            { group.deadlines.title && <button className = "button" onClick={ this.handleClick("title", false)}> Title </button> }
            { group.deadlines.description && <button className = "button"  onClick={ this.handleClick("description", false)}>Description</button> }
            { group.deadlines.tech && <button className = "button"  onClick={ this.handleClick("tech", false)}>Technology Used</button> }
            { group.deadlines.synopsis  && <button className = "button"  onClick={ this.handleClick("synopsis", true)}>Synopsis</button> }
            { group.deadlines.report  && <button className = "button"  onClick={ this.handleClick("report", true)}>Report</button> }
            
            <hr style={{backgroundColor: "black"}}/>

            { group.viva && <button className = "button" onClick= { this.handleClick("VIVA", false)}>VIVA</button> }
                
            <hr style={{backgroundColor: "black"}}/>
        </div>
    )

    handleClick = (str, file) => event => {
        if(this.state.show)
            alert("Please Fill in the Required Fields");
        else{
            if(!file)
                this.setState({  current: str,  currentFile: "", showFile: false  });
            else
                this.setState({  currentFile: str,  current: "", showFile: false  });
        }
    }

    renderFile = (currentFile, group) => (
        ( group.fields[currentFile] ? <FileViewer 
            fileType="pdf"
            filePath={`http://localhost:9090/${currentFile}/${group._id}`}
        /> : <div>*No File Uploaded*</div>)
    )

    displayFromSidebar = (group, current, currentFile, show, showFile) => (
        ( current ? ( 
                current === "VIVA" ?  (
                <div className="container">
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>VIVA</h4>
                    <p style= {{fontWeight: 'bold', marginLeft: "5%"}} >Scheduled Time and Date : {group.viva}</p>
                    <button className="btn btn-raised btn-primary ml-4 mt-4">Join Video Call</button> 
                </div> 
            ) : (
                <div className="container">
                    { current === "tech" ? <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Technology Used</h4> :
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}> {current.charAt(0).toUpperCase() + current.slice(1)}</h4> }
                    <p style = {{textAlign: "end"}}>Deadline:    {group.deadlines[current]}</p>

                    <h5 style={{marginTop: "2%", marginLeft: "1%"}}>{group.fields[current]}</h5>
                    
                    {show && ( <input className="form-control mt-5" type="text" value={group.fields[current]} name={current} placeholder="ENTER THE DETAILS"  onChange={this.handleChange}></input> )}
                    
                    { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-1 mt-4"  value ={group.deadlines[current]} onClick={this.handleEdit}>Edit</button> )}
                    { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-5 mt-4" onClick={this.handleSave}>Save</button> )}
                </div>
            )

        ) : (   
            
            <div className="container">
                <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline', marginBottom: "5%"}}>{currentFile.charAt(0).toUpperCase() + currentFile.slice(1)} of the Project</h4>
                <p style = {{textAlign: "end"}}>Deadline:    {group.deadlines[currentFile]}</p>
                    
                { showFile && this.renderFile(currentFile, group) }
                { show && ( <input className="form-control mt-5" type="file" name={currentFile} onChange={this.handleChange}></input> )}

                { !showFile && group.fields[currentFile] && (<button className="btn btn-raised btn-primary ml-1 mt-2" onClick={ () => {this.setState({showFile: true})} }>Show</button> )}
                { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-5 mt-2" value ={group.deadlines[currentFile]} onClick={this.handleEdit}>Edit</button> )}
                { this.checkDeadline() && (<button className="btn btn-raised btn-primary ml-5 mt-2" onClick={this.handleSave}>Save</button> )}
            </div> 
            )
        )
    )

    handleChange = (event) => {
        const {group, current} = this.state;

        const name = event.target.name;
        const value = current ? event.target.value : event.target.files[0];
        console.log(name);
        
        this.groupData.set(name,value);

        if(current){
            group.fields[name] = value;
            this.setState({
                group: group
            })
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
        this.setState({ show: true, showFile: false});
    }

    handleSave = (event) => {
        event.preventDefault();
        const {group, groupId, current} = this.state;

        if(group.fields[current] === ""){
            alert("Please fill in the required fields");
        }
        else{
            updateDetailsFiles(groupId, this.groupData)
            .then(data => {
                if(data.error)
                    console.log(data.error);
                else{
                    this.setState({
                                group: data.group,
                                show: false,
                                showFile: false
                    })
                }
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
        const {group, current, currentFile, show, showFile} = this.state
        return ( 
            (group && <div className="row"> 
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    { (current || currentFile) && this.displayFromSidebar(group, current, currentFile, show, showFile)}
                </div>
            </div>)
        )
    }
}
export default StudentDashborad;