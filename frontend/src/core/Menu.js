import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'


const isActive = (history, path) => {
    if(history.location.pathname === path)
        return {color: "#000000"}
    else
        return {color: "#009999"}
}

const Menu = ({history}) => (
    <div className="sticky-top">
        { isAuthenticated() && (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width: "100%"}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className = "navbar-nav navbar-nav ">
                        <li className = "nav-item">
                            { !isAuthenticated().teacher && <Link 
                                className = "nav-link" style={isActive(history, `/studentdashboard`)} to="/studentdashboard">Dashboard</Link> }
                        </li>
                        {isAuthenticated().teacher && (
                            <li className = "nav-item">
                                <Link className = "nav-link" style={isActive(history, `/mentorgroups/${isAuthenticated().user._id}`)} to={`/mentorgroups/${isAuthenticated().user._id}`}>Mentor</Link>
                            </li>  
                        )}
                        {isAuthenticated().teacher && (
                            <li className = "nav-item">
                                <Link className = "nav-link" style={isActive(history, `/supervisorgroups/${isAuthenticated().user._id}`)} to={`/supervisorgroups/${isAuthenticated().user._id}`}>Supervisor</Link>
                            </li>  
                        )}
                        
                    </ul>
                    <ul className = "navbar-nav navbar-nav ml-auto">
                        <li className = "nav-item" >
                            <Link className = "nav-link" style={isActive(history, "/signout")} to="/" onClick={() => signout(()=>history.push("/"))}>SignOut</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )}
    </div>
                
)


export default withRouter(Menu);