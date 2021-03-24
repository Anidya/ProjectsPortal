import React, {Component} from 'react'
import { createGroup } from '../group'

class AdminDashboard extends Component{
    constructor(){
        super()
        this.state = {
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
            fields: {
                title: "",
                description: ""
            },
            error: "",
            open: false
        }
    }

    
    handleChange = (str) => (event) => {
        this.setState({ 
            error: "",
            open: false 
        });
        this.setState({
            [str]: event.target.value
        });
    };

    handleMentor (event) {
        this.setState({ 
            error: "",
            open: false
        });
        const { mentor } = this.state;
        const name = event.target.name;
        const value = event.target.value
        mentor[name] = value;
        this.setState({
            mentor
        });
    };

    handleStudent (event, cnt) {
        this.setState({ 
            error: "",
            open: false 
        });
        const { students } = this.state;
        const name = event.target.name;
        const value = event.target.value
        students[cnt][name] = value;
        this.setState({
            students
        });
    };
    
    handleSupervisor (event, cnt) {
        this.setState({ 
            error: "",
            open: false 
        });
        const { supervisors } = this.state;
        const name = event.target.name;
        const value = event.target.value
        supervisors[cnt][name] = value;
        this.setState({
            supervisors
        });
    }



    clickSubmit = (event) => {
        event.preventDefault();
        const {id, mentor, students, supervisors, fields} = this.state
        const group = {
            id: id,
            mentor: mentor,
            students: students,
            supervisors: supervisors,
            fields: fields
        }
        createGroup(group)
            .then(data => {
                if (data.error) this.setState({ error: data.error })
                else this.setState({
                    id: "",
                    open: true,
                    error: "",
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
                    ]
                });
        });
    };
    

    groupForm = (id,mentor,students,supervisors) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Group ID</label>
                <input 
                    onChange = {this.handleChange("id")} 
                    type = "text" 
                    className = "form-control"
                    value = {id}>
                </input>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Mentor Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {mentor.name} 
                        onChange={(event) => this.handleMentor(event)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Mentor Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {mentor.email}
                        onChange={(event) => this.handleMentor(event)}>
                    </input>
                </div>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Student1 Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {students[0].name} 
                        onChange={(event) => this.handleStudent(event, 0)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Student1 Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {students[0].email}
                        onChange={(event) => this.handleStudent(event, 0)}>
                    </input>
                </div>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Student2 Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {students[1].name} 
                        onChange={(event) => this.handleStudent(event, 1)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Student2 Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {students[1].email}
                        onChange={(event) => this.handleStudent(event, 1)}>
                    </input>
                </div>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Student3 Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {students[2].name} 
                        onChange={(event) => this.handleStudent(event, 2)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Student3 Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {students[2].email}
                        onChange={(event) => this.handleStudent(event, 2)}>
                    </input>
                </div>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Supervisor1 Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {supervisors[0].name} 
                        onChange={(event) => this.handleSupervisor(event, 0)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Supervisor1 Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {supervisors[0].email}
                        onChange={(event) => this.handleSupervisor(event, 0)}>
                    </input>
                </div>
            </div>

            <div className="row ml-1">
                <div className="form-group">
                    <label className="text-muted">Supervisor2 Name</label>
                    <input
                        name = "name"
                        type = "name" 
                        className = "form-control"
                        value = {supervisors[1].name} 
                        onChange={(event) => this.handleSupervisor(event, 1)}>
                    </input>
                </div>
                <div className="form-group ml-5">
                    <label className="text-muted">Supervisor2 Email</label>
                    <input 
                        name = "email"
                        type = "email" 
                        className = "form-control"
                        value = {supervisors[1].email}
                        onChange={(event) => this.handleSupervisor(event, 1)}>
                    </input>
                </div>
            </div>

            <button onClick = {this.clickSubmit}  className="btn btn-raised btn-primary">Submit</button>
            
        </form>
          
    )


    render() {
        const {id,mentor,students,supervisors,error,open} = this.state;
        return (

                <div className="container">
                    <h2 className="mt-5 mb-5">Group Creation Form</h2>

                    <div className="alert alert-danger" style={{display: error ? "":"none"}}>
                        {error}
                    </div>

                    <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                        Group Created!
                    </div>
                    
                    {this.groupForm(id,mentor,students,supervisors)}    
                </div>
        );
    };
};


export default AdminDashboard;
