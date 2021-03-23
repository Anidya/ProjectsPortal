import React, {Component} from 'react'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

class TeacherDashborad extends Component{
    constructor(){
        super()
        this.state = {
        }
    }
    render() {
        return(
            <div className="row">
                <div className="card" style={{height: "400px", width: "350px", marginLeft: 250, marginTop: 50}}>
                    <div className="card-body">
                    <p className="card-title" style={{fontWeight: 400, fontSize: 26, marginLeft: 115}}>Mentor</p>
                    <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>View all groups under your mentorship</p>
                    <Link to={`/mentorgroups/${isAuthenticated().user._id}`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 90, marginTop: 25, fontWeight: 400, fontSize: 16}}>View Groups</Link>
                  </div>
                </div>
                <div className="card" style={{height: "400px", width: "350px", marginLeft: 250, marginTop: 50}}>
                    <div className="card-body">
                    <p className="card-title" style={{fontWeight: 400, fontSize: 26, marginLeft: 90}}>Supervisior</p>
                    <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>View all groups under your supervision</p>
                    <Link to={`/supervisorgroups/${isAuthenticated().user._id}`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 90, marginTop: 25, fontWeight: 400, fontSize: 16}}>View Groups</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default TeacherDashborad;