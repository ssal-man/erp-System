import React, { Component } from 'react';
import './teacherAttendance.style.scss';
import CustomButton from '../../components/custombutton/custombutton.component';
import THeader from '../../components/tHeader/tHeader.component';
import { withRouter } from 'react-router-dom';

class TeacherAttendance extends Component{
        componentDidMount(){
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
                <div className="n-options">
                    <div className="headerp">
                     <THeader/>
                </div>
                    <CustomButton onClick={()=>{this.props.history.push('/teacherCheckAttendance')}}>Check Attendance</CustomButton>
                    <CustomButton onClick={()=>{this.props.history.push('/giveAttendance')}}>Give Attendance</CustomButton>
                </div>
            )
        }
}

export default withRouter(TeacherAttendance);