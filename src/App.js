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
import CheckAttendance from './pages/CheckAttendance/checkAttendance.component';
import TeacherHomepage from './pages/teacherHomepage/teacherHomepage.component';
import GiveAttendance from './pages/giveAttendance/giveAttendance.component';
import AdminHome from './pages/adminHome/adminHome.component';
import ChangeAttendance from './pages/changeAttendance/changeAttendance.component';
import CreateNotice from './pages/createNotice/createNotice.component';
import CheckNotice from './pages/checkNotice/checkNotice.component';
import NoticeTeacher from './pages/noticeTeacher/noticeTeacher.component';
import TeacherCheckAttendance from './pages/teacherCheckAttendance/teacherCheckAttendance.component';
import TeacherAttendance from './pages/teacherAttendance/teacherAttendance.component';
import LeaveApplication from './pages/leaveApplication/leaveApplication.component';
import CheckNoticeStudent from './pages/checkNoticeStudent/checkNoticeStudent.component';
import NoticeAdmin from './pages/noticeAdmin/noticeAdmin.component';
import CreateNoticeAdmin from './pages/createNoticeAdmin/createNoticeAdmin.component';
import CheckNoticeAdmin from './pages/checkNoticeAdmin/checkNoticeAdmin.component';
import EditNotice from './pages/editNotice/editNotice.component';
import StudentChangePassword from './pages/studentChangePassword/studentChangePassword.component';
import TeacherChangePassword from './pages/teacherChangePassword/teacherChangePassword.component';
import AdminChangePassword from './pages/adminChangePassword/adminChangePassword.component';
import NotificationPage from './pages/notificationPage/notificationPage.component';
import FeePayment from './pages/feePayment/feePayment.component';
import AddStudent from './pages/addStudent/addStudent.component';
import AddTeacher from './pages/addTeacher/addTeacher.component';
import ClassCode from './pages/classCode/classCode.component';

function App(props) {
  return (
    <div className='App'>
      <Banner/>
      <Switch>
          <Route exact path='/' render={() => props.currentUser ? <Sprofile />:<Homepage/>} /> 
          <Route exact path='/parentSignIn' component={ParentSignIn}/>
          <Route exact path='/teacherSignIn' component={TeacherSignIn}/>
          <Route exact path='/adminSignIn' component={AdminSignIn}/>
          <Route exact path='/parentChangePassword' component={StudentChangePassword}/>
          <Route exact path='/teacherChangePassword' component={TeacherChangePassword}/>
          <Route exact path='/adminChangePassword' component={AdminChangePassword}/>
          <Route exact path='/checkAttendance' render={() => props.currentUser ? <CheckAttendance />:<Homepage/>}/>
          <Route exact path='/teacherHomepage' render={() => props.currentUser ? <TeacherHomepage />:<Homepage/>}/>
          <Route exact path='/giveAttendance' render={() => props.currentUser ? <GiveAttendance />:<Homepage/>}/>
          <Route exact path='/adminHome' render={() => props.currentUser ? <AdminHome />:<Homepage/>}/>
          <Route exact path='/changeAttendance' render={() => props.currentUser ? <ChangeAttendance />:<Homepage/>}/>
          <Route exact path='/createNotice' render={() => props.currentUser ? <CreateNotice />:<Homepage/>}/>
          <Route exact path='/checkNotice' render={() => props.currentUser ? <CheckNotice />:<Homepage/>}/>
          <Route exact path='/noticeTeacher' render={() => props.currentUser ? <NoticeTeacher />:<Homepage/>}/>
          <Route exact path='/teacherCheckAttendance' render={() => props.currentUser ? <TeacherCheckAttendance />:<Homepage/>}/>
          <Route exact path='/teacherAttendance' render={() => props.currentUser ? <TeacherAttendance />:<Homepage/>}/>
          <Route exact path='/leaveApplication' render={() => props.currentUser ? <LeaveApplication />:<Homepage/>}/>
          <Route exact path='/checkNoticeStudent' render={() => props.currentUser ? <CheckNoticeStudent />:<Homepage/>}/>
          <Route exact path='/noticeAdmin' render={() => props.currentUser ? <NoticeAdmin />:<Homepage/>}/>
          <Route exact path='/createNoticeAdmin' render={() => props.currentUser ? <CreateNoticeAdmin />:<Homepage/>}/>
          <Route exact path='/checkNoticeAdmin' render={() => props.currentUser ? <CheckNoticeAdmin />:<Homepage/>}/>
          <Route exact path='/editNotice/:sno' render={() => props.currentUser ? <EditNotice />:<Homepage/>}/>
          <Route exact path='/notificationPage' render={() => props.currentUser ? <NotificationPage />:<Homepage/>}/>
          <Route exact path='/feePayment' render={() => props.currentUser ? <FeePayment />:<Homepage/>}/>
          <Route exact path='/addStudent' render={() => props.currentUser ? <AddStudent />:<Homepage/>}/>
          <Route exact path='/addTeacher' render={() => props.currentUser ? <AddTeacher />:<Homepage/>}/>
          <Route exact path='/classCode' render={() => props.currentUser ? <ClassCode />:<Homepage/>}/>
      </Switch>
      <Footer/>    
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);

