import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom'
import { teacherSignin , authenticate, studentSignin, isAuthenticated} from '../auth'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            teacheremail: "",
            teacherpassword: "",
            studentemail: "",
            studentpassword: "",
            error: "",
            teacher: false,
            redirectToRefer: false,
            loading: false
        }
    }

    handleChange = (str) => (event) => {
        this.setState({ error: "" })
        this.setState({
            [str]: event.target.value
        });
    };

    clickSubmit = str => event => {
        event.preventDefault();
        this.setState({loading: true})
        const {teacheremail, teacherpassword, studentemail, studentpassword} = this.state
        let user;
        if(str === "true"){
            user = { email: teacheremail, password: teacherpassword };
            teacherSignin(user)
            .then(data => {
                if(data.error)
                    this.setState({error: data.error, loading: false, teacher: str})
                else
                    authenticate(data , () => { this.setState({redirectToRefer: true, teacher: str}) });
            })
        }
        else{
            user = { email: studentemail, password: studentpassword }
            studentSignin(user)
            .then(data => {
                if(data.error)
                    this.setState({error: data.error, loading: false, teacher: str})
                else
                    authenticate(data , () => { this.setState({redirectToRefer: true, teacher: str}) });
            })
        }
    }

    signinStudentForm = () => (
        <form>
            <div className="form-group mt-5">
                <input
                    placeholder = "Email"
                    onChange = {this.handleChange("studentemail")} 
                    type = "email" 
                    className = "form-control"
                    value = {this.state.studentemail}>
                </input>
            </div>
            <div className="form-group">
                <input
                    placeholder = "Password"
                    onChange = {this.handleChange("studentpassword")} 
                    type = "password" 
                    className = "form-control"
                    value = {this.state.studentpassword}>
                </input>   
            </div>
        </form>
    )

    signinTeacherForm = () => (
        <form>
            <div className="form-group mt-5">
                <input
                    placeholder = "Email"
                    onChange = {this.handleChange("teacheremail")} 
                    type = "email" 
                    className = "form-control"
                    value = {this.state.teacheremail}>
                </input>
            </div>
            <div className="form-group">
                <input
                    placeholder = "Password"
                    onChange = {this.handleChange("teacherpassword")} 
                    type = "password" 
                    className = "form-control"
                    value = {this.state.teacherpassword}>
                </input>   
            </div>
        </form>
    )

    render() {

        const {redirectToRefer, teacher, error} = this.state;
        if(redirectToRefer || isAuthenticated()){
            if(teacher === "true" || isAuthenticated().teacher)
                return <Redirect to={`/mentorgroups/${isAuthenticated().user._id}`}></Redirect>
            else
                return <Redirect to="/studentdashboard"></Redirect>
        }
        return (
            <div className="jumbotron">
                <h2>Welcome</h2>
                <p className="lead" style = {{fontWeight: 400, fontSize: 24}}>JIIT Projects Portal</p>

                <div className="row">
                    
                    <div className="card" style={{width: "30%", marginLeft: "12%", marginTop: "5%"}}>
                        <div className="card-body">
                        <p className="card-title mt-3" style={{fontSize: 22, textAlign: "center", fontFamily: "monospace"}}>LOGIN AS STUDENT</p>
                        <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>Manage all your projects. Attend meetings with the mentor and viva with supervisors. Upload essentials of your project.</p>
                        <div className="alert alert-danger mt-4" style={{display: (error && teacher === "false") ? "" : "none" }}>
                            {error}
                        </div>
                        {this.signinStudentForm()}
                        <button className="btn btn-raised btn-primary btn-sm" style = {{ marginTop: "10%", fontSize: 16, marginLeft: "38%"}} onClick = {this.clickSubmit("false")}>Login</button>
                        </div>
                    </div>

                    <div className="card" style={{width: "30%", marginLeft: "15%", marginTop: "5%"}}>
                        <div className="card-body">
                        <p className="card-title mt-3" style={{fontSize: 22, textAlign: "center", fontFamily: "monospace"}}>LOGIN AS TEACHER</p>
                        <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>Manage all your groups all one location. Arrange meeting with students and guiding through the project by giving small tasks.</p>
                        <div className="alert alert-danger mt-4" style={{display: (error && teacher === "true") ? "" : "none" }}>
                            {error}
                        </div>
                        {this.signinTeacherForm()}
                        <button className="btn btn-raised btn-primary btn-sm" style = {{ marginTop: "10%", fontSize: 16, marginLeft: "38%"}} onClick = {this.clickSubmit("true")}>Login</button>
                        </div>
                    </div>
                </div>


                <Link to={`/admindashboard`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 70, marginTop: 50, fontWeight: 400, fontSize: 16}}>Login As Admin</Link>
            </div>
        )
    }
}

export default Home;

