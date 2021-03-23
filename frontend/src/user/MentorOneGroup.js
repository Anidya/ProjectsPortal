import React, { Component } from 'react'
import { load } from './api'
import '../design/app.css'

class MentorOneGroup extends Component{
    constructor(){
        super()
        this.state = {
            group : {
                id: "",
                
                mentor: {
                    name: "",
                    email: ""
                },
                
                students: [
                    {    name: "", email: "" },
                    {    name: "", email: "" },
                    {    name: "", email: "" }
                ],
                supervisors: [
                    {   name: "", email: "" },
                    {   name: "", email: "" }
                ],

                fields: { title: "", description: "" },
                deadlines: { title: "", description: "" }
            },
            current: ""
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
                    group: data 
                })
        })
    }


    handleClick = (event) => {
        const value = event.target.value;
        this.setState({
            current: value
        })
    }
    render() {
        const {group, current} = this.state
        return (
            <div className="row">
                <div className="sidebar" >
                    <div className="container">
                        <button value="title" onClick={this.handleClick}>Title</button><br/>
                        <button value="description" onClick={this.handleClick}>Description</button>
                        <p>sibhsbh</p>
                    </div>
                </div>
                <div className="jumbotron" style={{marginLeft: "20%", width: "80%", height: "100%"}}>
                    <h2 style={{fontWeight: 'bold'}}>Group Details</h2>
                    <h5 style={{marginTop: "50px", fontWeight: 'bold',textDecorationLine: 'underline'}}>Group Id: {group.id}</h5>
                    <h5 style={{marginTop: "35px",fontWeight: 'bold',textDecorationLine: 'underline'}}>Students Details</h5>
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

                    { current === "title" && (
                        <div>
                            <h4 style={{marginTop: "40px",fontWeight: 'bold',textDecorationLine: 'underline'}}>Title of the Project</h4>
                            { group.fields && group.fields.title ? ( <h5>{group.fields.title}</h5> ) : (<h5>--- PROJECT TITLE NOT UPLOADED ---</h5>)}
                        </div>
                    )}

                    { current === "description" && (
                        <div>
                            <h4 style={{marginTop: "40px",fontWeight: 'bold',textDecorationLine: 'underline'}}>Description Of Project</h4>
                            { group.fields && group.fields.description ? ( <h5>{group.fields.description}</h5> ) : (<h5>--- PROJECT DESCRIPTION NOT UPLOADED ---</h5>) }
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default MentorOneGroup;