import React, { Component } from 'react';
import './teacherCheckAttendance.style.scss';
import THeader from '../../components/tHeader/tHeader.component';
import { getAttendance, getStudentByClass, changeSAttendance, compare } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { AttendanceCard } from '../../components/attendanceCard/attendanceCard.component';

class TeacherCheckAttendance extends Component{
    constructor(){
        super();
        this.state={
            details:[],
            month:'january',
            students:[],
            student:{}
        }
    }

    componentDidMount=async()=>{
        this.setState({students:await getStudentByClass(this.props.currentUser.Class)},()=>{this.loadData()})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});

        
    }

    loadData = async ()=>{
        this.setState({student:await changeSAttendance(document.getElementById('students').options[document.getElementById('students').selectedIndex].text)})
        const data= await getAttendance(document.getElementById('students').options[document.getElementById('students').selectedIndex].value,this.state.month)
        setTimeout(()=>{this.setState({details:data.sort(compare)})},2000)
    }

    handleChange = async ()=>{
        var e = document.getElementById("months");
        this.setState({month:e.options[e.selectedIndex].value},()=>{this.loadData()});
        
    }

    onHandleChange=()=>{
        this.loadData()
    }

    render(){
    return(
    <div className='check-attendance'>
        <div className="headerp">   
        <THeader/>   
        </div> 
        <div className='ca-box'>
        SELECT A NAME:
        <select name="students" id="students" onChange={this.onHandleChange} className='dropdown'>
                {
                    this.state.students.map(student=>(
                    <option value={`${student.admissionNo}`} key={student.admissionNo} >{student.displayName}</option>
                    ))
                }
        </select>
        {this.state.student?
        <div className='percentage'>
            Your Attendance Till Date is :{(this.state.student.presentDays/this.state.student.totalDays * 100).toFixed(2)}%
        </div>:<div>Loading...</div>
        }
        <div className='months'>
        <label htmlFor="months">Choose a month:</label>
        <select name="months" id="months" onChange={this.handleChange} defaultValue="january">
            <option value="january" >january</option>
            <option value="february">february</option>
            <option value="march">march</option>
            <option value="april">april</option>
            <option value="may">may</option>
            <option value="june">june</option>
            <option value="july">july</option>
            <option value="august">august</option>
            <option value="september">september</option>
            <option value="october">october</option>
            <option value="november">november</option>
            <option value="december">december</option>
        </select>
        </div>
        </div>
        <div className='calender'>
            {
                this.state.details.length===0?
                <div className='na'>Not Available</div>:
                this.state.details.map(detail=>(
                    <AttendanceCard detail={detail} key={detail.createdAt.seconds}/>
                ))

            }
        </div>
    </div>
    );}
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(TeacherCheckAttendance);