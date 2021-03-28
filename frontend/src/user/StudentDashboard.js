import React, { Component } from 'react'
import { load, updateDetails } from './api'
import { isAuthenticated } from '../auth'

class StudentDashborad extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : {
                id: "",
                mentor: { name: "", email: "" }, 
                students: [{ name: "", email: "" }, { name: "", email: "" }, { name: "", email: "" }],
                supervisors: [{ name: "", email: "" }, { name: "", email: "" }],
                fields: { title: "", description: ""},
                deadlines: { title: "", description: ""}
            },
            current: "",
            show: false
        }
    }

    componentDidMount = () => {
        const groupId = isAuthenticated().user.group;
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
 
    handleClick = (event) => {
        if(this.state.show){
            alert("Please Fill in the Required Fields");
        }
        else{
            const value = event.target.value;
            this.setState({
                current: value
            })
        }
    }

    sidebar = (group) => (
        <div>
            <p style={{fontSize: "20px", textAlign: "center"}}>Projects Details</p>
            <hr className = "line"/>
            
            { group.deadlines.title !== "" && <button className = "button" value="title" onClick={ (event) => this.handleClick(event)}> Title </button> }
            { group.deadlines.description !== ""  && <button className = "button" value="description" onClick={ (event) => this.handleClick(event)}>Description</button> }
            
            <hr style={{backgroundColor: "black"}}/>
        </div>
    )

    handleChange = (event) => {
        const {group} = this.state;
        group.fields[event.target.name] = event.target.value;
        this.setState({
            group: group
        })
    }

    handleEdit = (event) => {
        const {group, current} = this.state;

        let deadline = event.target.value;
        let today = new Date();
        let date = today.getDate();   
            date = ( date<10 ?  "0"+date.toString()  : date.toString() );
        let month = today.getMonth() + 1;
            month = ( month<10 ? "0"+month.toString() : month.toString() );
        let year = today.getFullYear();
        today = year.toString() + '-' + month.toString() + '-' + date.toString();

        if(deadline >= today){
            if(group.fields[current] === "--- PROJECT DETAILS NOT UPLOADED ---"){
                group.fields[current] = "";
                this.setState({ group: group });
            }
            this.setState({ show: true});
        }
    }

    handleSave = () => {
        const {group, groupId, current} = this.state;

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

    displayFromSidebar = (group, current, show) => (
        <div className="container">
            { current === "title" && ( <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Title of the Project</h4>
                    <h5>{group.fields.title}</h5>
                    {show && ( 
                        <input className="form-control mt-5" type="text" value={group.fields.title} name="title" placeholder="ENTER NEW TITLE" onChange={this.handleChange}></input> 
                    )}
                    <button className="btn btn-raised btn-primary ml-1 mt-4"  value ={group.deadlines.title } onClick={this.handleEdit}>Edit</button>
                    <button className="btn btn-raised btn-primary ml-5 mt-4" onClick={this.handleSave}>Save</button>
                </div>
            )}

            { current === "description" && ( <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Description Of Project</h4>
                    <h5>{group.fields.description}</h5>
                    {show && ( 
                        <input className="form-control mt-5" type="text" value={group.fields.description} name="description" placeholder="ENTER NEW DESCRIPTION" onChange={this.handleChange}></input>
                    )}
                    <br/>
                    <button className="btn btn-raised btn-primary ml-1 mt-4"  value ={group.deadlines.description} onClick={this.handleEdit}>Edit</button>
                    <button className="btn btn-raised btn-primary ml-5 mt-4" onClick={this.handleSave}>Save</button>
                </div>
            )}
        </div>
    )

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
                    <tr>
                    <th scope="row">1</th>
                    <td>{group.students[0].name}</td>
                    <td>{group.students[0].email}</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>{group.students[1].name}</td>
                    <td>{group.students[1].email}</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>{group.students[2].name}</td>
                    <td>{group.students[2].email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    render() {
        const {group, current, show} = this.state
        return (
            <div className="row">
                
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    {this.displayFromSidebar(group, current, show)}
                </div>
            </div>
        )
    }
}
export default StudentDashborad;