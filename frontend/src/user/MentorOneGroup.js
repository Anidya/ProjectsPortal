import React, { Component } from 'react'
import { load, updateDetails } from './api'
import '../design/app.css'

class MentorOneGroup extends Component{
    constructor(){
        super()
        this.state = {
            groupId: "",
            group : {
                id: "",
                mentor: { name: "", email: "" }, 
                students: [{ name: "", email: "" }, { name: "", email: "" }, { name: "", email: "" }],
                supervisors: [{ name: "", email: "" }, { name: "", email: "" }],
                fields: { title: "", description: "" },
                deadlines: { title: "", description: "" }
            },
            current: "",
            show: false,
            date: "",
            time: "",
        }
    }

    componentDidMount = () => {
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

    handleClick = (event, show) => {
        const value = event.target.value;
        this.setState({
            current: value,
            show: show
        })
    }

    setDate = str => (event) => {
        this.setState({
            [str]: event.target.value
        })
    } 

    dialog = (date, time) => (
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
                
                { group.fields.title !== "" && <button className = "button" value="title" onClick={ (event) => this.handleClick(event, false)}> Title </button> }
                { group.fields.description  && <button className = "button" value="description" onClick={ (event) => this.handleClick(event, false)}>Description</button> }
                
                <hr style={{backgroundColor: "black"}}/>
                
                <p style={{fontSize: "20px", textAlign: "center" }} >Assign Task</p>
                <hr className = "line"/>
                
                { group.fields.title === "" && <button className = "button" value="title" onClick= { (event) => this.handleClick(event, true)}> Title </button> }
                { group.fields.description ==="" && <button className = "button" value="description" onClick={ (event) => this.handleClick(event, true)}>Description</button> }
                
                <hr style={{backgroundColor: "black"}}/>
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

    displayFromSidebar = (group, current) => (
        <div>
            { current === "title" &&  group.fields.title !== "" &&  ( <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Title of the Project</h4>
                    <h5>{group.fields.title}</h5>
                </div>
            )}

            { current === "description" && group.fields.description !== "" && ( <div>
                    <h4 style={{marginTop: "5%",fontWeight: 'bold',textDecorationLine: 'underline'}}>Description Of Project</h4>
                    <h5>{group.fields.description} </h5>
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
        const {groupId, group, current, date} = this.state;

        if(current === "title"){
            group.fields.title = "--- PROJECT DETAILS NOT UPLOADED ---";
            group.deadlines.title = date;
        }
        if(current === "description"){
            group.fields.description = "--- PROJECT DETAILS NOT UPLOADED ---";
            group.deadlines.description = date;
        }

        this.setState({
            group
        })

        updateDetails(groupId, group)
        .then(data => {
            console.log("data",data);
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
        const {group, current, show, date, time} = this.state
        return (
            <div className="row">
                
                <div style={{ paddingTop:"2%", height:"100%", width: "21%", backgroundColor: "teal", position:"fixed"}}>
                    {this.sidebar(group)}
                </div>

                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    {this.mainGroupDetails(group)}
                    {this.displayFromSidebar(group, current)}
                    {show && this.dialog(date, time)}
                </div>
            </div>
        )
    }
}
export default MentorOneGroup;