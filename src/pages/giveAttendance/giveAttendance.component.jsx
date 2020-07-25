import React, { Component } from 'react';
import './giveAttendance.style.scss';
import { getStudentByClass, writeAttendance, alreadyDone, updateDays } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import THeader from '../../components/tHeader/tHeader.component';
import CustomButton from '../../components/custombutton/custombutton.component';

const today = new Date();
class GiveAttednance extends Component{
    constructor(){
        super();
        this.state={
            students:[]
        }
    }

    componentDidMount= async ()=>{
        this.setState({students:await getStudentByClass(this.props.currentUser.class)})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

     onSubmitHandle=  ()=>{
        this.state.students.forEach(async student=>{
            var ae;
            if(document.getElementById(student.admissionNo).checked){
                ae = await alreadyDone(this.props.currentUser.email)
                if(!ae){
                writeAttendance(true,student.admissionNo,student.Class)
                updateDays(student.totalDays+1,student.presentDays+1,student.admissionNo)
                }
            }else{
                ae = await alreadyDone(this.props.currentUser.email)
                if(!ae){
                writeAttendance(true,student.admissionNo,student.Class)
                updateDays(student.totalDays+1,student.presentDays,student.admissionNo)
            }}
        })
            this.props.history.push('/teacherHomepage')
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

export default connect(mapStateToProps)(GiveAttednance);