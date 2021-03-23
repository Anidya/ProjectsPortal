import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import TeacherSignup from './user/TeacherSignup'
import TeacherSignin from './user/TeacherSignin'
import TeacherDashborad from './user/TeacherDashboard'
import AdminDashboard from './user/AdminDashboard'
import MentorGroups from './user/MentorGroups'
import SupervisorGroups from './user/SupervisorGroups'
import MentorOneGroup from './user/MentorOneGroup'

const MainRouter = () => {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/teachersignup" component={TeacherSignup}></Route>
                <Route exact path="/teachersignin" component={TeacherSignin}></Route>
                <Route exact path="/teacherdashboard" component={TeacherDashborad}></Route>
                <Route exact path="/admindashboard" component={AdminDashboard}></Route>
                <Route exact path="/mentorgroups/:teacherId" component={MentorGroups}></Route>
                <Route exact path="/supervisorgroups/:teacherId" component={SupervisorGroups}></Route>
                <Route exact path="/mentor/:groupId" component={MentorOneGroup}></Route>
            </Switch>
        </div>
    );
};

export default MainRouter;