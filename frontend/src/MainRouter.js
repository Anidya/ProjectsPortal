import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import TeacherSignup from './user/TeacherSignup'
import TeacherSignin from './user/TeacherSignin'
import TeacherDashboard from './user/TeacherDashboard'
import AdminDashboard from './user/AdminDashboard'
import Mentorship from './user/Mentorship'
import SupervisorGroups from './user/SupervisorGroups'
import MentorGroup from './user/MentorGroup'
import StudentSignin from './user/StudentSignin'
import StudentDashborad from './user/StudentDashboard'

const MainRouter = () => {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/teachersignup" component={TeacherSignup}></Route>
                <Route exact path="/teachersignin" component={TeacherSignin}></Route>
                <Route exact path="/studentsignin" component={StudentSignin}></Route>
                <Route exact path="/teacherdashboard" component={TeacherDashboard}></Route>
                <Route exact path="/studentdashboard" component={StudentDashborad}></Route>
                <Route exact path="/admindashboard" component={AdminDashboard}></Route>
                <Route exact path="/mentorgroups/:teacherId" component={Mentorship}></Route>
                <Route exact path="/supervisorgroups/:teacherId" component={SupervisorGroups}></Route>
                <Route exact path="/mentor/:groupId" component={MentorGroup}></Route>
            </Switch>
        </div>
    );
};

export default MainRouter;