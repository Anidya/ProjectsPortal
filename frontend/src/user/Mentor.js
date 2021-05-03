import React, { Component } from 'react'
import {load} from './api'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

class Mentor extends Component{
    constructor(){
        super()
        this.state = {
            groups: "",
            flag: true
        }
    }

    componentDidMount () {
        this.setState({
            groups: isAuthenticated().user.mentorgroup
        })
    }

    loadgroups = (groups) => {
        this.setState({flag: ""});
        groups.map((group,i) => {
            load(group)
            .then(result => {
                groups[i] = result;
                this.setState({ groups}) 
            })
        })
    }

    renderGroups = (groups) => (
        <div className="row">
            { groups.map((group,i) => (
                (group.id && <div className="card" style={{height: "100%", width: "35%", marginLeft: "10%", marginTop: "5%"}} key={i}>
                    <div className="card-body" >
                        <p className="card-title" style={{fontWeight: 400, fontSize: 26, fontFamily: "monospace", textAlign: "center"}}>{group.id}</p>
                        <p className="card-text" style = {{fontWeight: 400, fontSize: 20, fontFamily: "serif"}}>Students:</p>
                        { group.students.map((student, j) => (student.name && <p key={j}>
                            <p>{student.name} </p>
                            <p>{student.email}</p>
                            <hr/>
                        </p>))}
                        <Link to={`/mentor/${group._id}`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: "32%", marginTop: "5%", fontWeight: 400, fontSize: 16}}>View Group</Link>
                    </div>
                </div>
                )
            ))}
        </div>
    )

    render() {
        const{groups, flag} = this.state
        if(groups && flag)
            this.loadgroups(groups);

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Groups</h2>
                {groups && this.renderGroups(groups)}
            </div>
        )
    }
}
export default Mentor;