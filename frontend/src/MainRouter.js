import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import AdminDashboard from './user/AdminDashboard'
import Mentorship from './user/Mentor'
import Supervisors from './user/Supervisor'
import SupervisorGroups from './user/SupervisorGroups'
import MentorGroup from './user/MentorGroup'
import StudentDashborad from './user/StudentDashboard'

const MainRouter = () => {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/studentdashboard" component={StudentDashborad}></Route>
                <Route exact path="/admindashboard" component={AdminDashboard}></Route>
                <Route exact path="/mentorgroups/:teacherId" component={Mentorship}></Route>
                <Route exact path="/supervisorgroups/:teacherId" component={Supervisors}></Route>
                <Route exact path="/mentor/:groupId" component={MentorGroup}></Route>
                <Route exact path="/supervisor/:groupId" component={SupervisorGroups}></Route>
            </Switch>
        </div>
    );
};

export default MainRouter;