import React from "react";
import {Link} from 'react-router-dom'

const Home = () => (
    <div className="jumbotron">
        <h2>Welcome</h2>
        <p className="lead" style = {{fontWeight: 400, fontSize: 24}}>JIIT Projects Portal</p>

        <div className="row">
            <div className="card" style={{height: "400px", width: "350px", marginLeft: 250, marginTop: 50}}>
                <div className="card-body">
                  <p className="card-title" style={{fontWeight: 400, fontSize: 26, marginLeft: 50}}>LogIn As Student</p>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>Manage all your projects. Attend meetings with the mentor and viva with supervisors. Upload essentials of yor project.</p>
                  <Link to={`/studentsignin`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 70, marginTop: 25, fontWeight: 400, fontSize: 16}}>Login As Student</Link>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16, marginLeft: 80, marginTop: 15}}>Not yet registered?</p>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16, marginLeft: 75, marginTop: 15}}>Click here to <a href="/studentsignup">Signup</a></p>
                </div>
            </div>
            <div className="card" style={{height: "400px", width: "350px", marginLeft: 250, marginRight: 50, marginTop: 50}}>
                <div className="card-body">
                  <p className="card-title" style={{fontWeight: 400, fontSize: 26, marginLeft: 50}}>LogIn As Teacher</p>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>Manage all your groups all one location. Arrange meeting with students and guiding through the project by giving small tasks.</p>
                  <Link to={`/teachersignin`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 70, marginTop: 25, fontWeight: 400, fontSize: 16}}>Login As Teacher</Link>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16, marginLeft: 80, marginTop: 15}}>Not yet registered?</p>
                  <p className="card-text" style = {{fontWeight: 400, fontSize: 16, marginLeft: 75, marginTop: 15}}>Click here to <a href="/teachersignup">Signup</a></p>
                </div>
            </div>
        </div>
        <Link to={`/admindashboard`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 70, marginTop: 25, fontWeight: 400, fontSize: 16}}>Login As Admin</Link>
    </div>
);

export default Home;

