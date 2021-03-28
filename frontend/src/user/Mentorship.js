import React, { Component } from 'react'
import {list} from './api'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

class Mentorship extends Component{
    constructor(){
        super()
        this.state = {
            groups: []
        }
    }

    componentDidMount () {
        list()
        .then(data => {
            if(data.error)
                console.log(data.error)
            else
                this.setState({groups: data})
        })
    }

    renderUsers = (groups) => (
        <div className="row">
            { groups.map((group,i) => (
                ( group.mentor.email === isAuthenticated().user.email && (
                    <div className="card" style={{height: "400px", width: "350px", marginLeft: 250, marginTop: 50}} key={i}>
                        <div className="card-body" >
                            <p className="card-title" style={{fontWeight: 400, fontSize: 26, marginLeft: 68}}>{group.id}</p>
                            <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>Students:</p>
                            <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>{group.students[0].name}</p>
                            <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>{group.students[1].name}</p>
                            <p className="card-text" style = {{fontWeight: 400, fontSize: 16}}>{group.students[2].name}</p>
                            <Link to={`/mentor/${group._id}`} className="btn btn-raised btn-primary btn-sm" style = {{marginLeft: 90, marginTop: 25, fontWeight: 400, fontSize: 16}}>View Group</Link>
                        </div>
                    </div>
                ))
            ))}
        </div>
    )


    render() {
        const{groups} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Groups</h2>
                {this.renderUsers(groups)}
            </div>
        )
    }
}
export default Mentorship;