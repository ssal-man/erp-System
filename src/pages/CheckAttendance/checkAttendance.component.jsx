import React, { Component } from 'react';
import './checkAttendance.style.scss';
import PHeader from '../../components/pHeader/pHeader.component';
import { getAttendance } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { AttendanceCard } from '../../components/attendanceCard/attendanceCard.component';

class CheckAttendance extends Component{
    constructor(){
        super();
        this.state={
            details:[],
            month:'january'
        }
    }

    componentDidMount=async()=>{
        this.loadData()
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});

        
    }

    loadData = async ()=>{
        const data= await getAttendance(this.props.currentUser.admissionNo,this.state.month)
        setTimeout(()=>{this.setState({details:data})},1000)
        
    }

    handleChange = async ()=>{
        var e = document.getElementById("months");
        this.setState({month:e.options[e.selectedIndex].value},()=>{this.loadData()});
        
    }

    render(){
    return(
    <div className='check-attendance'>
        <div className="headerp">   
        <PHeader/>    
        </div>
        <div className='percentage'>
            Your Attendance Till Date is :{(this.props.currentUser.presentDays/this.props.currentUser.totalDays * 100).toFixed(2)}%
        </div>
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
        <div className='calender'>
            {
                this.state.details.length===0?
                <div className='na'>Not Available</div>:
                this.state.details.map(detail=>(
                    <AttendanceCard detail={detail} key={detail.createdAt}/>
                ))

            }
        </div>
    </div>
    );}
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(CheckAttendance);