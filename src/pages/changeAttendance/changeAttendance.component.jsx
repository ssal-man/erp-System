import React, { Component } from 'react';
import './changeAttendance.style.scss';
import { connect } from 'react-redux';
import { getAllStudents, changeSAttendance, writeSAttendance, updateDays } from '../../firebase/firebase.utils';
import CustomButton from '../../components/custombutton/custombutton.component';
import AHeader from '../../components/aHeader/aHeader.component';
import { withRouter } from 'react-router-dom';

class ChangeAttendance extends Component{
    constructor(props){
        super(props);
        this.state={
            student:{},
            students:[]
        }
    }
    componentDidMount = async () =>{
        this.setState({students:await getAllStudents()})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
        this.onHandleChange()
    }

    onHandleChange=async ()=>{
        this.setState({student:await changeSAttendance(document.getElementById('students').options[document.getElementById('students').selectedIndex].value)})
    }

    onHandleSubmit=()=>{
        if(document.getElementById("changeAttendance").value){
            const rbtn = document.getElementsByName('same')
            var i
            for(i=0;i<rbtn.length;i++){
                if (rbtn[i].checked) {
                    if (rbtn[i].value === 'present') {
                        writeSAttendance(true,document.getElementById("changeAttendance").value,this.state.student.admissionNo)
                        updateDays(this.state.student.totalDays,this.state.student.presentDays+1,this.state.student.admissionNo)
                    
                    } else {
                        writeSAttendance(false,document.getElementById("changeAttendance").value,this.state.student.admissionNo)
                        updateDays(this.state.student.totalDays,this.state.student.presentDays-1,this.state.student.admissionNo)
                    }
            }}
            this.props.history.push('/adminHome')
        }
        else{
            alert("please select a date")
        }
    }
    render(){
        return(
            <div className='specific'>
             <div className="headerp">
                     <AHeader/> 
            </div>
            Fill the Information:-
            <div className='chng-a-fill'>
            <form>  
            <label htmlFor='students'>Name of the student:</label>
            <select name="students" id="students" onChange={this.onHandleChange} className='dropdown'>
                {
                    this.state.students.map(student=>(
                    <option value={`${student.displayName}`} key={student.admissionNo} >{student.displayName}</option>
                    ))
                }
            </select>
            </form> 
            <form action="/action_page.php">
            <label htmlFor="changeAttendance">Select the date:</label>
            <input type="date" id="changeAttendance" name="changeAttendance" className='date'></input>
            </form>
            </div>
            Student's Information:-
            <div className='chng-a-fill'>
                {this.state.student?
                <div className='s-info'>
            <span className='ch-name'>Name:{this.state.student.displayName}</span>
                <span className='ch-rollNo'>Roll number:{this.state.student.rollNo}</span>
                <span className='ch-admsnNo'>Admission No.:{this.state.student.admissionNo}</span>
                </div>:null}
                <label className="container">Present
                    <input type="radio"  value="present" name='same'/>
                    <span className="checkmark"></span>
                </label>
                <label className="container">Absent
                     <input type="radio"  value="absent" name='same'/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <CustomButton onClick={this.onHandleSubmit} className='c-btn'>Submit</CustomButton>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(ChangeAttendance));