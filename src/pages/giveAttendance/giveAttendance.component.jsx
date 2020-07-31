import React, { Component } from 'react';
import './giveAttendance.style.scss';
import {  writeAttendance, updateDays, emailDetails, checker, getStudentByClassFilter } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import THeader from '../../components/tHeader/tHeader.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { withRouter } from 'react-router-dom';

const today = new Date();
class GiveAttednance extends Component{
    constructor(){
        super();
        this.state={
            students:[]
        }
    }

    componentDidMount= async ()=>{
        this.setState({students:await getStudentByClassFilter(this.props.currentUser.Class)})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

     onSubmitHandle= async ()=>{
        if(await checker(this.props.currentUser.email)){
        this.state.students.forEach(async student=>{
            if(document.getElementById(student.admissionNo).checked){
                writeAttendance(true,student.admissionNo,student.Class,this.props.currentUser.email)
                updateDays(student.totalDays+1,student.presentDays+1,student.admissionNo)
                
            }else{
                writeAttendance(true,student.admissionNo,student.Class,this.props.currentUser.email)
                updateDays(student.totalDays+1,student.presentDays,student.admissionNo)
            }
        })
        window.onload = function() {
            const eList = emailDetails()
            eList.forEach(obj => {
              if(obj.fire===true){
                window.Email.send({
                Host : "smtp.gmail.com",
                Username : "erpsystem@school.com",
                Password : "E4834787E38CC612A340E2F90B74B20C96BE",
                To : obj.parentEmail,
                From : "testssalman@gmail.com",
                Subject : "Monthly Attendance Report Card",
                Body : `Hi ${obj.parentName},
                total days school was open ${obj.totalDays} and your ward attended ${obj.presentDays} `
      }).then(
        message => alert(message)
      );
              }
            });
          };
          this.props.history.push('/teacherHomepage')
    }else{
        alert("Attendance already taken")
        this.props.history.push('/teacherHomepage')
    }
}


    render(){
        return(
            <div className='sheet'>
                <div className="headerp">
                <THeader/>
                </div>
                <span className='date'>Attendance On {today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}</span>
                <div className='info'>*Check the box for marking student as present or else leave it unchecked for marking student as absent</div>
                <div className='table-cell'>
                 <table> 
                <thead>  
                <tr>
                <th>Roll number</th>
                <th>Name</th>
                <th>Present</th>
                </tr>  
                </thead>  
                </table>
                {
                    this.state.students.map(student=>(
                        <table className='cell' key={student.admissionNo}>   
                        <thead>         
                        <tr>
                        <td><span className='rno'>{student.rollNo}</span></td>  
                        <td><label htmlFor='present'><span className='name'>{student.displayName}</span></label></td>
                        <td><input type="checkbox" id={`${student.admissionNo}` }name='present' value='present'></input></td>
                        </tr>
                        </thead>
                        </table>
                    ))
                }
                </div>
                <CustomButton onClick={this.onSubmitHandle}>Submit</CustomButton>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(GiveAttednance));