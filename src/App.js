import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
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
import Examination from './pages/examination/examination.component';
import Result from './pages/Results/result.component';
import CheckResult from './pages/checkResult/checkResult.component';
import { ReactComponent as Message } from './assets/message.svg';
import Chat from './pages/chat/chat.component';

class App extends Component{
  render(){
  return (
    <div className='App'>
      <Banner/>
      <Switch>
          <Route exact path='/' render={() => this.props.currentUser ? <Sprofile />:<Homepage/>} /> 
          <Route exact path='/parentSignIn' component={ParentSignIn}/>
          <Route exact path='/teacherSignIn' component={TeacherSignIn}/>
          <Route exact path='/adminSignIn' component={AdminSignIn}/>
          <Route exact path='/parentChangePassword' component={StudentChangePassword}/>
          <Route exact path='/teacherChangePassword' component={TeacherChangePassword}/>
          <Route exact path='/adminChangePassword' component={AdminChangePassword}/>
          <Route exact path='/checkAttendance' render={() => this.props.currentUser ? <CheckAttendance />:<Homepage/>}/>
          <Route exact path='/teacherHomepage' render={() => this.props.currentUser ? <TeacherHomepage />:<Homepage/>}/>
          <Route exact path='/giveAttendance' render={() => this.props.currentUser ? <GiveAttendance />:<Homepage/>}/>
          <Route exact path='/adminHome' render={() => this.props.currentUser ? <AdminHome />:<Homepage/>}/>
          <Route exact path='/changeAttendance' render={() => this.props.currentUser ? <ChangeAttendance />:<Homepage/>}/>
          <Route exact path='/createNotice' render={() => this.props.currentUser ? <CreateNotice />:<Homepage/>}/>
          <Route exact path='/checkNotice' render={() => this.props.currentUser ? <CheckNotice />:<Homepage/>}/>
          <Route exact path='/noticeTeacher' render={() => this.props.currentUser ? <NoticeTeacher />:<Homepage/>}/>
          <Route exact path='/teacherCheckAttendance' render={() => this.props.currentUser ? <TeacherCheckAttendance />:<Homepage/>}/>
          <Route exact path='/teacherAttendance' render={() => this.props.currentUser ? <TeacherAttendance />:<Homepage/>}/>
          <Route exact path='/leaveApplication' render={() => this.props.currentUser ? <LeaveApplication />:<Homepage/>}/>
          <Route exact path='/checkNoticeStudent' render={() => this.props.currentUser ? <CheckNoticeStudent />:<Homepage/>}/>
          <Route exact path='/noticeAdmin' render={() => this.props.currentUser ? <NoticeAdmin />:<Homepage/>}/>
          <Route exact path='/createNoticeAdmin' render={() => this.props.currentUser ? <CreateNoticeAdmin />:<Homepage/>}/>
          <Route exact path='/checkNoticeAdmin' render={() => this.props.currentUser ? <CheckNoticeAdmin />:<Homepage/>}/>
          <Route exact path='/editNotice/:sno' render={() => this.props.currentUser ? <EditNotice />:<Homepage/>}/>
          <Route exact path='/notificationPage' render={() => this.props.currentUser ? <NotificationPage />:<Homepage/>}/>
          <Route exact path='/feePayment' render={() => this.props.currentUser ? <FeePayment />:<Homepage/>}/>
          <Route exact path='/addStudent' render={() => this.props.currentUser ? <AddStudent />:<Homepage/>}/>
          <Route exact path='/addTeacher' render={() => this.props.currentUser ? <AddTeacher />:<Homepage/>}/>
          <Route exact path='/classCode' render={() => this.props.currentUser ? <ClassCode />:<Homepage/>}/>
          <Route exact path='/examination' render={() => this.props.currentUser ? <Examination />:<Homepage/>}/>
          <Route exact path='/result' render={() => this.props.currentUser ? <Result />:<Homepage/>}/>
          <Route exact path='/checkResult' render={() => this.props.currentUser ? <CheckResult />:<Homepage/>}/>
          <Route exact path='/chat' render={() => this.props.currentUser ? <Chat />:<Homepage/>}/>
      </Switch>
      {this.props.currentUser?
        this.props.currentUser.status==='teacher'?
      <Message className='msg' onClick={()=>{this.props.history.push('/chat')}}/>:
      this.props.currentUser.status==='student'?<Message className='msg' onClick={()=>{this.props.history.push('/chat')}}/>
      :null
      :null}
      <Footer/>    
    </div>
  );
  }
}


const mapStateToprops = (state) => ({
  currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToprops)(App));

