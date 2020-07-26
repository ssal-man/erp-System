import React, { Component } from 'react';
import './leaveApplication.style.scss';
import { getStudentByClass, changeSAttendance, leaveSApplication, addFromAndTo } from '../../firebase/firebase.utils';
import THeader from '../../components/tHeader/tHeader.component';
import { connect } from 'react-redux';
import CustomButton from '../../components/custombutton/custombutton.component';


class LeaveApplication extends Component{
    constructor(props){
        super(props);
        this.state={
            student:{},
            students:[],
            gap:0,
            from:new Date(),
            to:new Date()
        }
    }
    componentDidMount = async () =>{
        this.setState({students:await getStudentByClass(this.props.currentUser.class)})
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
        this.setState({student:await changeSAttendance(document.getElementById('students').options[document.getElementById('students').selectedIndex].text)})
    }

    onHandleSubmit=async ()=>{
        const from = new Date(document.getElementById("from").value)
        var i;
        await addFromAndTo(document.getElementById('students').options[document.getElementById('students').selectedIndex].value,this.state.from
        ,this.state.to)
        for(i=0;i<this.state.gap;i++){
            await leaveSApplication(true,from,document.getElementById('students').options[document.getElementById('students').selectedIndex].value)
            from.setDate(from.getDate()+1)
        }
    }

    onChangeDate = () =>{
         this.setState({from : new Date(document.getElementById("from").value)},()=>{
             this.setState({to : new Date(document.getElementById("to").value)},()=>{
                 this.setState({gap:(((this.state.to.getTime()-this.state.from.getTime())/(1000*3600*24))+1)})})
        })
        
    }

    render(){
        return(
            <div className='specific'>
             <div className="headerp">
                     <THeader/>
            </div>
            <form>  
            <label htmlFor='students'>Name of the student:</label>
            <select name="students" id="students" onChange={this.onHandleChange} className='dropdown'>
                {
                    this.state.students.map(student=>(
                    <option value={`${student.admissionNo}`} key={student.admissionNo} >{student.displayName}</option>
                    ))
                }
            </select>
            </form> 
            <form action="/action_page.php">
            <label htmlFor="changeAttendance">From:</label>
            <input type="date" id="from" name="from" className='date'></input>
            </form>
            <form action="/action_page.php">
            <label htmlFor="changeAttendance">To:</label>
            <input type="date" id="to" name="to" className='date' onChange={this.onChangeDate}></input>
            </form>
            <div className='ch-card'>
                {this.state.student?
                <div className='s-info'>
            <span className='ch-name'>Name:{this.state.student.displayName}</span>
                <span className='ch-rollNo'>Roll number:{this.state.student.rollNo}</span>
                <span className='ch-admsnNo'>Admission No.:{this.state.student.admissionNo}</span>
                </div>:null}
                <div>Leave Application for {`${this.state.gap}`} Days</div>
            </div>
            <CustomButton onClick={this.onHandleSubmit}>Submit</CustomButton>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(LeaveApplication);