import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Banner from './components/banner/banner.component';
import Homepage from './pages/homepage/homepage.component';
import Footer from './components/footer/footer.component';
import Sprofile from './components/student_profile/sprofile.component';
import ParentSignIn from './pages/psignin/psignin.component';
import AdminSignIn from './pages/asignin/asignin.component';
import TeacherSignIn from './pages/tsignin/tsignin.component';
import { connect } from 'react-redux';
import checkAttendance from './pages/CheckAttendance/checkAttendance.component';
import TeacherHomepage from './pages/teacherHomepage/teacherHomepage.component';
import GiveAttendance from './pages/giveAttendance/giveAttendance.component';
import AdminHome from './pages/adminHome/adminHome.component';
import ChangeAttendance from './pages/changeAttendance/changeAttendance.component';
import CreateNotice from './pages/createNotice/createNotice.component';
import CheckNotice from './pages/checkNotice/checkNotice.component';
import NoticeTeacher from './pages/noticeTeacher/noticeTeacher.component';

function App(props) {
  return (
    <div className='App'>
      <Banner/>
      <Switch>
          <Route exact path='/' render={() => props.currentUser ? <Sprofile />:<Homepage/>} /> 
          <Route exact path='/parentSignIn' component={ParentSignIn}/>
          <Route exact path='/teacherSignIn' component={TeacherSignIn}/>
          <Route exact path='/adminSignIn' component={AdminSignIn}/>
          <Route exact path='/checkAttendance' component={checkAttendance}/>
          <Route exact path='/teacherHomepage' component={TeacherHomepage}/>
          <Route exact path='/giveAttendance' component={GiveAttendance}/>
          <Route exact path='/adminHome' component={AdminHome}/>
          <Route exact path='/changeAttendance' component={ChangeAttendance}/>
          <Route exact path='/createNotice' component={CreateNotice}/>
          <Route exact path='/checkNotice' component={CheckNotice}/>
          <Route exact path='/noticeTeacher' component={NoticeTeacher}/>
      </Switch>
      <Footer/>    
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);

