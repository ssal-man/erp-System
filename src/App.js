import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Banner from './components/banner/banner.component';
import Homepage from './pages/homepage/homepage.component';
import Footer from './components/footer/footer.component';
import PHeader from './components/pHeader/pHeader.component';
import Sprofile from './components/student_profile/sprofile.component';
import ParentSignIn from './pages/psignin/psignin.component';
import AdminSignIn from './pages/asignin/asignin.component';
import TeacherSignIn from './pages/tsignin/tsignin.component';

function App() {
  return (
    <div className='App'>
      <Banner/>
      <PHeader/>
      <Switch>
          <Route exact path='/' component={Homepage} /> 
          <Route exact path='/sp' component={Sprofile} /> 
          <Route exact path='/parentSignIn' component={ParentSignIn}/>
          <Route exact path='/teacherSignIn' component={TeacherSignIn}/>
          <Route exact path='/adminSignIn' component={AdminSignIn}/>
      </Switch>
      <Footer/>    
    </div>
  );
}

export default App;
