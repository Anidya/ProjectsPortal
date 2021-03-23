import React, {Component} from 'react'
import {teacherSignup} from '../auth'
import {Link} from 'react-router-dom'

class TeacherSignup extends Component{
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = (str) => (event) => {
        this.setState({ error: "" })
        this.setState({
            [str]: event.target.value
        });
    };


    clickSubmit = (event) => {
        event.preventDefault();
        const {name,email,password,error} = this.state
        const user = {
            name: name,
            email: email,
            password: password,
            error: error
        };
        teacherSignup(user)
        .then(data => {
            if(data.error)
                this.setState({error: data.error})
            else
                this.setState({ 
                    error: "",
                    name: "",
                    password: "",
                    email: "",
                    open: true
                })
        })
    };
    

    signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange = {this.handleChange("name")} 
                    type = "text" 
                    className = "form-control"
                    value = {this.state.name}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange = {this.handleChange("email")} 
                    type = "email" 
                    className = "form-control"
                    value = {this.state.email}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange = {this.handleChange("password")} 
                    type = "password" 
                    className = "form-control"
                    value = {this.state.password}>
                </input>   
            </div>
            <button onClick = {this.clickSubmit}  className="btn btn-raised btn-primary">Submit</button>
        </form>
    )


    render(){
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display: this.state.error ? "" : "none" }}>
                    {this.state.error}
                </div>
                <div className="alert alert-info" style={{display: this.state.open ? "" : "none" }}>
                    New account is successfully created. Please <Link to="/teachersignin">Signin</Link>. 
                </div>
                {this.signupForm()}
            </div>
        );
    };
};

export default TeacherSignup;