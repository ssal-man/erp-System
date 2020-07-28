import React, { Component } from 'react';
import './leaveApplication.style.scss';
import {  leaveSApplication, addFromAndTo } from '../../firebase/firebase.utils';
import THeader from '../../components/tHeader/tHeader.component';
import { connect } from 'react-redux';
import CustomButton from '../../components/custombutton/custombutton.component';
import { withRouter } from 'react-router-dom';


class LeaveApplication extends Component{
    constructor(props){
        super(props);
        this.state={
            gap:0,
            from:new Date(),
            to:new Date()
        }
    }
    componentDidMount = async () =>{
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    onHandleSubmit=async ()=>{
        const from = new Date(document.getElementById("from").value)
        var i;
        await addFromAndTo(this.props.currentUser.admissionNo,this.state.from
        ,this.state.to)
        for(i=0;i<this.state.gap;i++){
            await leaveSApplication(true,from,this.props.currentUser.admissionNo)
            from.setDate(from.getDate()+1)
        }
        this.props.history.push('/teacherHomepage')
    }

    onChangeDate = () =>{
         this.setState({from : new Date(document.getElementById("from").value)},()=>{
             this.setState({to : new Date(document.getElementById("to").value)},()=>{
                 this.setState({gap:(((this.state.to.getTime()-this.state.from.getTime())/(1000*3600*24))+1)})})
        })
        
    }

    render(){
        return(
            <div className='leave-app'>
             <div className="headerp">
                     <THeader/>
            </div>
            <div className='la-fill'>   
            Fill The Information:-
            <label htmlFor='reason'>Describe your reason</label>
            <textArea id='reason'></textArea>
            <form action="/action_page.php">
            <label htmlFor="changeAttendance">From:</label>
            <input type="date" id="from" name="from" className='date'></input>
            </form>
            <form action="/action_page.php">
            <label htmlFor="changeAttendance">To:</label>
            <input type="date" id="to" name="to" className='date' onChange={this.onChangeDate}></input>
            </form>
            </div>
            <div className='la-fill'>
                Student Information:-
                <div >
            <span className='ch-name'>Name:{this.props.currentUser.displayName}</span>
                <span className='ch-rollNo'>Roll number:{this.props.currentUser.rollNo}</span>
                <span className='ch-admsnNo'>Admission No.:{this.props.currentUser.admissionNo}</span>
                </div>
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

export default withRouter(connect(mapStateToProps)(LeaveApplication));