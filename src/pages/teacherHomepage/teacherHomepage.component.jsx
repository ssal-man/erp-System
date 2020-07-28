import React, { Component } from 'react';
import './teacherHomepage.style.scss';
import THeader from '../../components/tHeader/tHeader.component';
// import { getStudentByClass } from '../../firebase/firebase.utils';
// import  Ssprofile  from '../../components/students_profile/ssprofile.component';
import { connect } from 'react-redux';

class teacherHomepage extends Component{

    // constructor(props){
    //     super(props);
    //     this.state={
    //         students:[]
    //     }
    // } 
    componentDidMount=async ()=>{
        // this.setState({students:await getStudentByClass(this.props.currentUser.class)})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }
    render(){   
    return(
        <div className="t-homepage">
            <div className="headerp">
            <THeader/>
            </div>
            {/* <div className='s-cards'>
                {
                    this.state.students.map(student=>(
                        <Ssprofile student={student} key={student.admissionNo}/>
                    ))
                }
            </div> */}
            <div className="container">
  <ul className="responsive-table">
  <h2>TIMETABLE</h2>
    <li className="table-header">
      <div className="col col-1">Days</div>
      <div className="col col-2">1st period</div>
      <div className="col col-3">2nd period</div>
      <div className="col col-5">3rd period</div>
      <div className="col col-6">Recess</div>
      <div className="col col-7">4th period</div>
      <div className="col col-8">5th period</div>
      <div className="col col-8">6th period</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Day">MON</div>
      <div className="col col-2" data-label="1st period">English</div>
      <div className="col col-3" data-label="2nd period">Hindi</div>
      <div className="col col-4" data-label="3rd period">Science</div>
      <div className="col col-5" data-label="Recess"></div>
      <div className="col col-6" data-label="4th period">Mathematics</div>
      <div className="col col-7" data-label="5th period">Social Std</div>
      <div className="col col-8" data-label="6th period">Yoga</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Days">TUES</div>
      <div className="col col-2" data-label="1st period">Science</div>
      <div className="col col-3" data-label="2nd period">CS</div>
      <div className="col col-4" data-label="3rd period">English</div>
      <div className="col col-5" data-label="Recess"></div>
      <div className="col col-6" data-label="4th period">Mathematics</div>
      <div className="col col-7" data-label="5th period">Social Std</div>
      <div className="col col-8" data-label="6th period">Hindi</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Days">WED</div>
      <div className="col col-2" data-label="1st period">Hindi</div>
      <div className="col col-3" data-label="2nd period">Science</div>
      <div className="col col-4" data-label="3rd period">Yoga</div>
      <div className="col col-5" data-label="Recess"></div>
      <div className="col col-6" data-label="4th period">Mathematics</div>
      <div className="col col-7" data-label="5th period">English</div>
      <div className="col col-8" data-label="6th period">Social std</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Days">THRUS</div>
      <div className="col col-2" data-label="1st period">CS</div>
      <div className="col col-3" data-label="2nd period">English</div>
      <div className="col col-4" data-label="3rd period">Socail std</div>
      <div className="col col-5" data-label="Recess"></div>
      <div className="col col-6" data-label="4th period">Mathematics</div>
      <div className="col col-7" data-label="5th period">Hindi</div>
      <div className="col col-8" data-label="6th period">Science</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Days">FRI</div>
      <div className="col col-2" data-label="1st period">English</div>
      <div className="col col-3" data-label="2nd period">Hindi</div>
      <div className="col col-4" data-label="3rd period">Science</div>
      <div className="col col-5" data-label="Recess"></div>
      <div className="col col-6" data-label="4th period">Mathematics</div>
      <div className="col col-7" data-label="5th period">Social Studies</div>
      <div className="col col-8" data-label="6th period">Yoga</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Days">SAT</div>
      <div className="col col-2" data-label="1st period">English</div>
      <div className="col col-3" data-label="2nd period">Hindi</div>
      <div className="col col-4" data-label="3rd period">Science</div>
      <div className="col col-5" data-label="Recess">CS</div>
      <div className="col col-6" data-label="4th period"></div>
      <div className="col col-7" data-label="5th period"></div>
      <div className="col col-8" data-label="6th period"></div>
    </li>
  </ul>
</div>
        </div>
    );
            }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(teacherHomepage);